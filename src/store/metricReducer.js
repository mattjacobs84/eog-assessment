import { createSlice } from 'redux-starter-kit';

const initialState = {
    metricList: [],
    metricData: [],
    metricUpdate: [],
    metricSelect: []
};

const metrics = createSlice({
    name: 'metrics',
    initialState,
    reducers: {
        metricList: (state, action) => {
            state.metricList = action.payload; 
        },
        metricData: (state, action) => {
            state.metricData = action.payload;
        },
        metricUpdate: (state, action) => {
            const update = state.metricData.find((element, index) => {
                return element.metric === action.payload.metric;
            });
            update.measurements.push(action.payload.metric);
            update.measurements.shift();
            state.metricUpdate = update;
        },
        metricSelect: (state, action) => {
            state.metricSelect = action.payload;
        }
    }
});

export const reducer = metrics.reducer;
export const actions = metrics.actions;