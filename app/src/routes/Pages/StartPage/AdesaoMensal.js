import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import HighchartsReact from 'highcharts-react-official';
import { getMensalidadesEmpresas } from '../../../redux/actions/Empresa';
import { useDispatch } from 'react-redux';

const optionsBase = {
  title: {
    text: 'Empresas realizaram contribuição',
  },
  subtitle: {
    text: 'Quantidade de empresas que fizeram contribuição no mês',
  },
  accessibility: {
    point: {
      valueDescriptionFormat: '{xDescription}{separator}{value}',
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    title: {
      text: 'Mês',
    },
    type: 'category',
    categories: [],
  },
  chart: {
    type: 'column',
  },
  yAxis: {
    title: {
      text: 'Total de empresas',
    },
  },

  tooltip: {
    headerFormat: '<b>{series.name}</b><br />',
    pointFormat: '{point.y}',
  },

  series: [
    {
      name: 'Empresas',
      keys: ['y'],
      data: [],
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: [
          [0, '#6225ed'],
          [1, '#9b20d9'],
        ],
      },
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        inside: true,
        verticalAlign: 'top',
        format: '{point.y}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '11px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
  ],
};

const AdesaoMensalChart = () => {
  const dispatch = useDispatch();
  const [optionsChart, setOptionsChart] = useState('');

  useEffect(() => {
    const cbRetorno = resp => {
      var options = optionsBase;
      var data = [];
      var categories = [];
      for (var i in resp) {
        data.push([resp[i].soma_empresas_pagamento]);
        categories.push([resp[i].mes]);
      }
      options.series[0].data = data;
      options.xAxis.categories = categories;
      setOptionsChart(options);
    };
    if (optionsChart === '') {
      dispatch(getMensalidadesEmpresas({}, cbRetorno));
    }
  }, [optionsChart, dispatch]);

  return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={optionsChart} />;
};

export default AdesaoMensalChart;
