import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    const metricData = useSelector(state => state.metrics.metricData);
    const [result] = useSubscription({ query: subscriptionQuery });
    const {data, error} = result;
    
    const dispatch = useDispatch();

    useEffect(() => {
    if(data && (metricData.length !== 0)){
      const update = data.newMeasurement;
      dispatch({ type: 'METRIC_UPDATE', payload: update  });
    }
    }, [data, dispatch, metricData.length]);
    
    if(error){
        return <div>{error}</div>;
    }
    
    return null;
};

export default MetricSubscription;