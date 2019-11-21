import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
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
  const [metricList, setMetricList] = useState([]);
  const [metricData, setMetricData] = useState([]);
  
  const [listResults] = useQuery({
    query: metricQuery,
    variables: {}
  });
  
  const [multiResults] = useQuery({
    query: multipleMetrics,
    variables: {
      "input": [{"metricName": "flareTemp", "after": now.getTime() - 300000}, {"metricName": "oilTemp"}]
    }
  });
  
  console.log(multiResults.data);
  
  // const {fetching, data, error} = listResults;

  if(listResults.fetching){
    return <div>Loading...</div>;
  }
  
  if(listResults.error){
    return <div>{listResults.error}</div>;
  }
  
  return (
    <div>
      <div>
        {listResults.data.getMetrics.map((metric, index) => <div key={index}>{metric}</div>)}
        <MetricSelect metricList={listResults.data.getMetrics} selectedMetrics={metricList} setMetrics={setMetricList} />
        <MetricChart selectedMetrics={metricList} />
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
