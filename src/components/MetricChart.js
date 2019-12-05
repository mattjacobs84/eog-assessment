import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ResponsiveLine } from '@nivo/line';

const SpecificChart = ({data, metricList}) => {
  
  const eachChart = useMemo(() => {
    const metricTitle = metricList.find(item => item.metric === data[0].metric).name;
    const updatedData = data.map(item => {
      const time = new Date(item.at);
      return {"x": `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, "y": item.value};
    });
    
    const newData = [
      {
        "id": `${metricTitle}`,
        "data": updatedData
      }
    ];

    return (
        <div style={{height: '25vh', width: '100vw'}}>
          {metricTitle}
          <ResponsiveLine
                  data={newData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{
                      type: 'time',
                      format: '%H:%M:%S',
                      precision: 'second',
                      useUTC: false
                  }}
                  xFormat="time:%H:%M:%S"
                  yScale={{ type: 'linear', max: 'auto', min: 'auto' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    format: '%H:%M:%S',
                    tickValues: 'every 5 minutes',
                  }}
                  axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: `${data[0].unit}`,
                      legendOffset: -45,
                      legendPosition: 'middle'
                  }}
                  tooltip={(props) => {
                  // console.log(props)
                    return(
                      `${props.point.serieId}: ${props.point.data.y} ${data[0].unit}`
                    );
                  }}
                  colors={{ scheme: 'nivo' }}
                  enablePoints={false}
                  enableCrosshair={true}
                  useMesh={true}
              />
        </div>
    );
  }, [data, metricList]);
  
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