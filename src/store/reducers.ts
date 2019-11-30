import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricReducer } from './metrics/metricReducer';

export default {
  weather: weatherReducer,
  metrics: metricReducer
};