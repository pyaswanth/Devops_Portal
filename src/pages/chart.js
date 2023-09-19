import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyChart = () => {
  const data = [
    {
      x: [1, 2, 3, 4],
      y: [10, 11, 9, 12],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    },
  ];

  const layout = {
    // title: 'Simple Scatter Plot',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Jobs' },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default PlotlyChart;
