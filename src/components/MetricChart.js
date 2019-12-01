import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';



const MetricChart = () => {
    const chartData = useSelector(state => state.metrics.metricData);
    const selected = useSelector(state => state.metrics.metricSelect);
    const metricList = useSelector(state => state.metrics.metricList);

    const renderChart = () => {
      console.log("Render Chart");
        return selected.map(metric => {
            const selectedMetric = chartData.find(item => item.metric === metric);
            console.log("Render Specific Chart");
            return (
                <div key={metric}>
                  {metricList.find(item => item.metric === metric).name}
                  <LineChart
                      width={500}
                      height={300}
                      data={selectedMetric.measurements}
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
        });
    };
    
  return (
    <div>
      <div>Live Data:</div>
      {renderChart()}
    </div>
  );
};

export default MetricChart;


    // <LineChart
    //     width={500}
    //     height={300}
    //     data={chartData[0].measurements}
    //     margin={{
    //       top: 45, right: 30, left: 20, bottom: 5,
    //     }}
    //   >
       
    //     <XAxis dataKey="at" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Line dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    //   </LineChart>
    
    
      //     <LineChart
      //   width={500}
      //   height={300}
      //   data={testData}
      //   margin={{
      //     top: 45, right: 30, left: 20, bottom: 5,
      //   }}
      // >
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="name" />
      //   <YAxis />
      //   <Tooltip />
      //   <Legend />
      //   <Line dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      //   <Line dataKey="uv" stroke="#82ca9d" />
      // </LineChart>
      
//       const testData = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];