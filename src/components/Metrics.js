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

// const useStyles = makeStyles({

// });

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

const query = `
  {
    getMetrics
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

const MetricList = () => {
  const [metrics, setMetrics] = useState([]);
  
  const [result] = useQuery({
    query,
    variables: {}
  });
  
  const {fetching, data, error} = result;

  if(fetching){
    return <div>Loading...</div>;
  }
  
  if(error){
    return <div>{error}</div>;
  }
  
  const renderSelector = () => {
    return <div>hi</div>;
  };
  
  console.log(metrics);
  
  return (
    <div>
      <div>
        {data.getMetrics.map((metric, index) => <div key={index}>{metric}</div>)}
        {renderSelector()}
        <MetricSelect metricList={data.getMetrics} selectedMetrics={metrics} setMetrics={setMetrics} />
      </div>
    </div>
  );
};

const MetricChart = () => {
  
  const [result] = useSubscription({ query: subscriptionQuery });
  
  const {data, error} = result;
  
  if(error){
    return <div>Error loading subscription.</div>;
  }
  
  console.log(data);
  
  return (
    <div>Live Data:</div>
  );
};

export default () => {
  // const classes = useStyles();
  return (
    <div>
      <Provider value={client}>
        <MetricList />
        <MetricChart />
      </Provider>
    </div>
  );
};
