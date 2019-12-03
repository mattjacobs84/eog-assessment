import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelect from './MetricSelect';
import MetricCard from './MetricCard';
import MetricChart from './MetricChart';
import MetricSubscription from './MetricSubscription';

const useStyles = makeStyles({
  container: {
    margin: 20
  }
});

const metricQuery = `
  {
    getMetrics
  }
`;

const multipleMetrics = `
  query MultipleMeasurements ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
        metric
        unit
      }
    }
  }
`;

const now = new Date();

const Metrics = () => {
  const [listResults] = useQuery({
    query: metricQuery,
    variables: {}
  });
  
  const time = now.getTime() - 300000;
  
  const [multiResults] = useQuery({
    query: multipleMetrics,
    variables: {
      "input": [
        {"metricName": "injValveOpen", "after": time}, 
        {"metricName": "oilTemp", "after": time},
        {"metricName": "tubingPressure", "after": time},
        {"metricName": "flareTemp", "after": time},
        {"metricName": "casingPressure", "after": time},
        {"metricName": "waterTemp", "after": time}
      ]
    }
  });
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(listResults.data){
      dispatch({  type: 'METRIC_LIST', payload: listResults.data.getMetrics });
    }
  }, [listResults.data]);
  
  useEffect(() => {
    if(multiResults.data) {
      dispatch({ type: 'METRIC_DATA', payload: multiResults.data.getMultipleMeasurements });
    }
  }, [multiResults.data]);

  if(listResults.fetching){
    return <div>Loading...</div>;
  }
  
  if(listResults.error){
    return <div>{listResults.error}</div>;
  }
  
  return (
    <div>
      <div>
        <MetricSelect style={{marginBottom: '44px'}}/>
      </div>
    </div>
  );
};

export default () => {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <MetricSubscription />
      <Metrics />
      <MetricCard />
      <MetricChart />
    </div>
  );
};
