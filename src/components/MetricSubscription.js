import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';

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

const MetricSubscription = () => {
    const dispatch = useDispatch();

    const [result] = useSubscription({ query: subscriptionQuery });
    
    console.log("Subscription component");
    
    const {data, error} = result;

    useEffect(() => {
    if(data){
      const update = data.newMeasurement;
    
      dispatch({ type: 'METRIC_UPDATE', payload: update  });
    }
    }, [data]);
    
    if(error){
        return <div>{error}</div>;
    }
    
    return null;
    
};

export default MetricSubscription;