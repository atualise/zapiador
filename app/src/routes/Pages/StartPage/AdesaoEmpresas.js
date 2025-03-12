import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import HighchartsReact from 'highcharts-react-official';
import { getAdesaoEmpresas } from '../../../redux/actions/Empresa';
import { useDispatch } from 'react-redux';

const optionsBase = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Taxa de adesão de empresas',
  },
  subtitle: {
    text: 'Percentual de empresas cadastradas que fizeram contribuição ',
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
    crosshair: true,
    accessibility: {
      description: 'Mês',
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: '% taxa de adesão',
    },
  },
  tooltip: {
    valueSuffix: '%',
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  series: [
    {
      name: 'Empresas',
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
        inside: false,
        verticalAlign: 'top',
        format: '{point.y:.1f}%', // one decimal
        y: -15, // 10 pixels down from the top
        style: {
          fontSize: '11px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
  ],
};

const AdesaoEmpresasChart = () => {
  const dispatch = useDispatch();
  const [optionsChart, setOptionsChart] = useState('');

  useEffect(() => {
    const cbRetorno = resp => {
      var options = optionsBase;
      var data = [];
      var categories = [];
      for (var i in resp) {
        data.push([resp[i].mes, resp[i].taxa_adesao_empresas]);
        categories.push([resp[i].mes]);
      }
      options.series[0].data = data;
      options.xAxis.categories = categories;
      setOptionsChart(options);
    };
    if (optionsChart === '') {
      dispatch(getAdesaoEmpresas({}, cbRetorno));
    }
  }, [optionsChart, dispatch]);

  return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={optionsChart} />;
};

export default AdesaoEmpresasChart;
