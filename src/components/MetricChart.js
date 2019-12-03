import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

const SpecificChart = ({data, metricList}) => {
  const eachChart = useMemo(() => {
    return (
        <div>
          {metricList.find(item => item.metric === data[0].metric).name}
          <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 45, right: 30, left: 20, bottom: 5,
              }}
          >
              <XAxis dataKey="at" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
    );
  }, [data]);
  
  return eachChart;
};

const MetricChart = () => {
    const chartData = useSelector(state => state.metrics.metricData);
    const selected = useSelector(state => state.metrics.metricSelect);
    const metricList = useSelector(state => state.metrics.metricList);

    const renderChart = () => {
      return selected.map(metric => {
        const selectedMetric = chartData.find(item => item.metric === metric);
        return (
          <SpecificChart data={selectedMetric.measurements} metricList={metricList} key={metric} />
        );
      });
    };
    
  return (
    <div>
      {renderChart()}
    </div>
  );
};

export default MetricChart;