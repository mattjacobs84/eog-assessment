import { createSlice } from 'redux-starter-kit';

const initialState = {
    metricList: [],
    metricData: []
};

const metrics = createSlice({
    name: 'metrics',
    initialState,
    reducers: {
        metricListReceived: (state, action) => {
            state.metricList = action.payload; 
        },
        metricTest: (state, action) => {
            state.metricData = action.payload;
        }
    }
});

export const reducer = metrics.reducer;
export const actions = metrics.actions;