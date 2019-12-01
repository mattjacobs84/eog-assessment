import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelect from './MetricSelect';
import MetricCard from './MetricCard';
import MetricChart from './MetricChart';

const useStyles = makeStyles({
  container: {
    margin: 20
  }
});

const now = new Date();

const subscriptionClient = new SubscriptionClient(
'wss://react.eogresources.com/graphql',
 {}
);

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
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

const subscriptionQuery = `
  subscription {
    newMeasurement{
      metric
      value
      unit
      at
    }
  }
`;


const Metrics = () => {
  const [listResults] = useQuery({
    query: metricQuery,
    variables: {}
  });
  
  const selectedMetrics = useSelector(state => state.metrics.metricSelect);

  const time = now.getTime() - 300000;
  
  // const inputVariables = selectedMetrics.map(metric => {
  //   return {"metricName": metric, "after": time};
  // });

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
  
  //   const inputVariables = selectedMetrics.map(metric => {
  //   return {"metricName": metric, "after": time};
  // });

  // const [multiResults] = useQuery({
  //   query: multipleMetrics,
  //   variables: {
  //     "input": inputVariables
  //   }
  // });
  
  const dispatch = useDispatch();
  
const [result] = useSubscription({ query: subscriptionQuery });
  
  const {data, error} = result;


  
  useEffect(() => {
    if(data){
      const update = data.newMeasurement;

      dispatch({ type: 'METRIC_UPDATE', payload: update  });
    }
  }, [data]);
  
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
  
if(!data){
    return <div>Loading...</div>;
  }
  
  if(error){
    return <div>Error loading subscription.</div>;
  }

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
        <MetricCard />
        <MetricChart selectedMetrics={selectedMetrics} />
      </div>
    </div>
  );
};

export default () => {
  const classes = useStyles();
  
  return (
    <Provider value={client}>
      <div className={classes.container}>
        <Metrics />
      </div>
    </Provider>
  );
};
