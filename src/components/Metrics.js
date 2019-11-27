import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
// import Card from '@material-ui/core/Card';
// import CardHeader from './CardHeader';
// import Typography from '@material-ui/core/Typography';
// import CardContent from '@material-ui/core/CardContent';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { makeStyles } from '@material-ui/core/styles';
import MetricSelect from './MetricSelect';
import Chip from './Chip';

// const useStyles = makeStyles({

// });

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
  // const [metricList, setMetricList] = useState([]);
  // const [metricData, setMetricData] = useState([]);
  
  const [listResults] = useQuery({
    query: metricQuery,
    variables: {}
  });
  
  const dataStore = useSelector(state => state);
  console.log(dataStore);
  
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
  
  console.log(multiResults.data);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(listResults.data){
      dispatch({  type: 'METRIC_LIST', payload: listResults.data.getMetrics });
      dispatch({  type: 'METRIC_UPDATE', payload: [1, 2, 3] });
    }
  }, [listResults.data]);
  
  useEffect(() => {
    if(multiResults.data) {
      console.log("dispatch data")
      dispatch({ type: 'METRIC_DATA', payload: multiResults.data.getMultipleMeasurements });
    }
  }, [multiResults.data]);

  if(listResults.fetching){
    return <div>Loading...</div>;
  }
  
  if(listResults.error){
    return <div>{listResults.error}</div>;
  }
  
  const selectedMetrics = dataStore.metrics.metricList;
  
  return (
    <div>
      <div>
        {dataStore.metrics.metricList.map((metric, index) => <div key={index}>{metric}</div>)}
        <MetricSelect />
        <MetricChart selectedMetrics={selectedMetrics} />
        <Chip label="Deletable" variant="outlined" />
      </div>
    </div>
  );
};

const MetricChart = (props) => {
  const [result] = useSubscription({ query: subscriptionQuery });
  
  const {data, error} = result;
  
  if(error){
    return <div>Error loading subscription.</div>;
  }
  
  // console.log(data);
  
  return (
    <div>
      <div>Live Data:</div>
      {props.selectedMetrics.map((metric, index) => {
        return <div key={index}>{metric}</div>;
        }
      )}
    </div>
  );
};

export default () => {
  // const classes = useStyles();
  return (
    <div>
      <Provider value={client}>
        <Metrics />
      </Provider>
    </div>
  );
};
