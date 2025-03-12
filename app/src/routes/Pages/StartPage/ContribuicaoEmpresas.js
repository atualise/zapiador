import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import HighchartsReact from 'highcharts-react-official';
import { getTopEmpresasBaixaAdesaoSocios } from '../../../redux/actions/Empresa';
import { useDispatch } from 'react-redux';

const optionsBase = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Top 15 empresas com baixa adesão de sócios',
  },
  credits: {
    enabled: false,
  },
  subtitle: {
    text: 'Empresas com maior número de funcionarios mas baixa adesão de sócios',
  },
  xAxis: {
    type: 'category',
    labels: {
      autoRotation: [-45, -90],
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif',
      },
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total de Funcionários',
    },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    pointFormat: 'Número de funcionários: <b>{point.y:.0f}</b>',
  },
  series: [
    {
      name: 'Funcionários',
      colors: [
        '#9b20d9',
        '#9215ac',
        '#861ec9',
        '#7a17e6',
        '#7010f9',
        '#691af3',
        '#6225ed',
        '#5b30e7',
        '#533be1',
        '#4c46db',
        '#4551d5',
        '#3e5ccf',
        '#3667c9',
        '#2f72c3',
        '#277dbd',
        '#1f88b7',
        '#1693b1',
        '#0a9eaa',
        '#03c69b',
        '#00f194',
      ],
      colorByPoint: true,
      groupPadding: 0,
      data: [['Empresa Nome A', 37.33]],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        inside: true,
        verticalAlign: 'top',
        format: '{point.y}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
  ],
};

const ContribuicaoEmpresasChart = () => {
  const dispatch = useDispatch();
  const [optionsChart, setOptionsChart] = useState('');

  useEffect(() => {
    const cbRetorno = resp => {
      var options = optionsBase;
      var data = [];
      for (var i in resp) {
        data.push([resp[i].razao_social, resp[i].soma_nao_socios]);
      }
      options.series[0].data = data;
      setOptionsChart(options);
    };
    if (optionsChart === '') {
      dispatch(getTopEmpresasBaixaAdesaoSocios({}, cbRetorno));
    }
  }, [optionsChart, dispatch]);

  return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={optionsChart} />;
};

export default ContribuicaoEmpresasChart;
