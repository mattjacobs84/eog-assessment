import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

const MetricCard = ({ data }) => {
    const classes = useStyles();
    const cardData = useSelector(state => state.metrics.metricData);
    const selected = useSelector(state => state.metrics.metricSelect);
    const metricList = useSelector(state => state.metrics.metricList);

    const renderCard = () => {
      return selected.map(metric => {
          const item = cardData.find(dataSet => dataSet.metric === metric);
            if(item){
                const itemIndex = item.measurements.length - 1;
                return (
                    <Grid key={item.metric} item xs={3}>
                        <Paper className={classes.paper}>
                            <div>{metricList.find(metric => metric.metric === item.metric).name}</div>
                            <div>{item.measurements[itemIndex].value} {item.measurements[itemIndex].unit}</div>
                        </Paper>
                    </Grid>
                );
            } 
            return null;
      });
    };
   
    return (
        <div className={classes.container}>
            <Grid container spacing={3}>
                {renderCard()}
            </Grid>
        </div>
    );
};

export default MetricCard;