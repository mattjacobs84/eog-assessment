import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ResponsiveLine } from '@nivo/line';

const SpecificChart = ({data, metricList}) => {
  
  const eachChart = useMemo(() => {
    const metricTitle = metricList.find(item => item.metric === data[0].metric).name;
    const updatedData = data.map(item => {
      const time = new Date(item.at);
      return {"x": `${time.getMinutes()}:${time.getSeconds()}`, "y": item.value};
    });
    const newData = [
      {
        "id": `${metricTitle}`,
          "data": updatedData
      }
    ];
    return (
        <div style={{height: '400px', width: '50%'}}>
          {metricTitle}
          <ResponsiveLine
                  data={newData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{
                      type: 'time',
                      format: '%M:%S'
                  }}
                  xFormat="time:%M:%S"
                  yScale={{ type: 'linear', max: 'auto' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    format: '%M:%S',
                    tickValues: 'every 1 minute',
                    legend: 'time scale',
                    legendOffset: -12,
                  }}
                  axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: `${data[0].unit}`,
                      legendOffset: -40,
                      legendPosition: 'middle'
                  }}
                  colors={{ scheme: 'nivo' }}
                  enablePoints={false}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  enableCrosshair={false}
                  useMesh={true}
                  legends={[
                      {
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 100,
                          translateY: 0,
                          itemsSpacing: 0,
                          itemDirection: 'left-to-right',
                          itemWidth: 80,
                          itemHeight: 20,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: 'circle',
                          symbolBorderColor: 'rgba(0, 0, 0, .5)',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemBackground: 'rgba(0, 0, 0, .03)',
                                      itemOpacity: 1
                                  }
                              }
                          ]
                      }
                  ]}
              />
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