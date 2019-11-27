import { put, takeLatest } from 'redux-saga/effects';

function* updateMetricList(action) {
    yield put({ type: "metrics/metricList", payload: action.payload });
}

function* metricData(action) {
    yield put({ type: "metrics/metricData", payload: action.payload });
}

function* updateMetrics(action) {
    yield put({ type: "metrics/metricUpdate", payload: action.payload });
}

function* metricSelect(action) {
    yield put({ type: "metrics/metricSelect", payload: action.payload });
}

export default function* metricList() {
    yield takeLatest('METRIC_LIST', updateMetricList);
    yield takeLatest('METRIC_DATA', metricData);
    yield takeLatest('METRIC_UPDATE', updateMetrics);
    yield takeLatest('METRIC_SELECT', metricSelect);
}