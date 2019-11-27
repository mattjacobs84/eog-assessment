import { put, takeLatest } from 'redux-saga/effects';

function* updateMetricList(action) {
    yield put({ type: "metrics/metricListReceived", payload: action.payload });
}

function* updateMetrics(action) {
    yield put({ type: "metrics/metricTest", payload: action.payload });
}

export default function* metricList() {
    yield takeLatest('METRIC_LIST', updateMetricList);
    yield takeLatest('METRIC_UPDATE', updateMetrics);
}