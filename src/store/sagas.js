import { spawn, all } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricSaga from './metricSaga';

export default function* root() {
  yield all([spawn(weatherSaga), spawn(metricSaga)]);
}
