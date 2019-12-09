import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';

const SpecificChart = ({ data, metricList }) => {
  const eachChart = useMemo(() => {
    const metricTitle = metricList.find(item => item.metric === data[0].metric).name;
    const updatedData = data.map(item => {
      const time = new Date(item.at);
      return { x: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, y: item.value };
    });

    const chartData = [
      {
        id: `${metricTitle}`,
        data: updatedData,
      },
    ];

    const minMax = updatedData => {
      let min = updatedData[0].y,
        max = updatedData[0].y;

      for (let i = 1; i < updatedData.length; i++) {
        let value = updatedData[i].y;
        min = value < min ? value : min;
        max = value > max ? value : max;
      }
      return [min, max];
    };

    const [dataMin, dataMax] = minMax(updatedData);

    const unit = data[0].unit;

    return (
      <div>
        <h3>{metricTitle}</h3>
        <div style={{ fontSize: '0.8em' }}>
          <p>{'30 Minute High: ' + dataMax + ' ' + unit}</p>
          <p>{'30 Minute Low: ' + dataMin + ' ' + unit}</p>
        </div>
        <div style={{ height: '350px', width: '100vw', minHeight: '200px', fontFamily: 'roboto' }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
            xScale={{
              type: 'time',
              format: '%H:%M:%S',
              precision: 'second',
              useUTC: false,
            }}
            xFormat="time:%H:%M:%S"
            yScale={{ type: 'linear', max: dataMax * 1.1, min: dataMin === 0 ? 0 : dataMin - 0.1 * dataMax }}
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
              legend: `${unit}`,
              legendOffset: -45,
              legendPosition: 'middle',
              tickValues: 5,
            }}
            tooltip={props => {
              return (
                <div>
                  {props.point.serieId}: {props.point.data.y} {unit}
                </div>
              );
            }}
            colors={{ scheme: 'nivo' }}
            enablePoints={false}
            enableCrosshair={true}
            useMesh={true}
          />
        </div>
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
      return <SpecificChart data={selectedMetric.measurements} metricList={metricList} key={metric} />;
    });
  };

  return <div>{renderChart()}</div>;
};

export default MetricChart;
