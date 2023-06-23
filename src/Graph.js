import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const Graph = () => {
  const [timeScale, setTimeScale] = useState('Minutes');
  const [selectedPlots, setSelectedPlots] = useState(['A', 'B', 'C']);

  const data = [
    { time: '1', A: 10, B: 20, C: 15 },
    { time: '2', A: 15, B: 25, C: 20 },
    { time: '3', A: 20, B: 30, C: 25 },
    // Add more data as needed
  ];

  const handleTimeScaleChange = (scale) => {
    setTimeScale(scale);
  };

  const handlePlotSelection = (plot) => {
    if (selectedPlots.includes(plot)) {
      setSelectedPlots(selectedPlots.filter((p) => p !== plot));
    } else {
      setSelectedPlots([...selectedPlots, plot]);
    }
  };

  const getMaxValueForPlot = (plot) => {
    return Math.max(...data.map((item) => item[plot]));
  };

  const renderGraph = () => {
    const filteredData = data.filter((item) => selectedPlots.includes(item.time));

    const xLabels = data.map((item) => item.time);

    const yLabels = selectedPlots.map((plot) => ({
      plot,
      maxValue: getMaxValueForPlot(plot),
    }));

    const datasets = selectedPlots.map((plot) => ({
      label: plot,
      data: filteredData.map((item) => item[plot]),
      fill: false,
    }));

    const options = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Value',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      },
    };

    const chartData = {
      labels: xLabels,
      datasets: datasets,
    };

    return <Line data={chartData} options={options} />;
  };

  const renderTabs = () => {
    return (
      <div>
        <h2>Tabs</h2>
        {['A', 'B', 'C'].map((plot) => (
          <button
            key={plot}
            onClick={() => handlePlotSelection(plot)}
            style={{ backgroundColor: selectedPlots.includes(plot) ? 'green' : 'white' }}
          >
            {plot}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h2>Time Scale</h2>
        {['Minutes', 'Hours', 'Days'].map((scale) => (
          <button
            key={scale}
            onClick={() => handleTimeScaleChange(scale)}
            style={{ backgroundColor: timeScale === scale ? 'green' : 'white' }}
          >
            {scale}
          </button>
        ))}
      </div>
      {renderGraph()}
      {renderTabs()}
    </div>
  );
};

export default Graph;
