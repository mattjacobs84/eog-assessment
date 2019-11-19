import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery, useSubscription, Client, defaultExchanges, subscriptionExchange } from 'urql';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

const client = createClient({
  url: 'https://react.eogresources.com/graphql'
});

const query = `
  {
    getMetrics
  }
`;

const MetricChart = () => {
  // const [metrics, setMetrics] = useState([]);
  
  const [result] = useQuery({
    query,
    variables: {}
  });
  
  const {fetching, data, error} = result;

  if(fetching){
    return <div>Loading...</div>
  }
  
  if(error){
    return <div>{error}</div>
  }

  return (
    <div>
      <div>
        {data.getMetrics.map(metric => <div>{metric}</div>)}
      </div>
    </div>
  )
}

export default () => {
  const classes = useStyles();
  return (
    <div>
      <Provider value={client}>
        <MetricChart />
      </Provider>
    </div>
  );
};
