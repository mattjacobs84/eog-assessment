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
            const namedMetrics = action.payload.map(metric => {
                console.log(metric);
                if(metric === 'injValveOpen'){
                    return {metric: metric, name: "Injector Valve Open"};
                }                
                if(metric === 'oilTemp'){
                    return {metric: metric, name: "Oil Temperature"};
                }                
                if(metric === 'tubingPressure'){
                    return {metric: metric, name: "Tubing Pressure"};
                }                
                if(metric === 'flareTemp'){
                    return {metric: metric, name: "Flare Temperature"};
                }
                if(metric === 'casingPressure'){
                    return {metric: metric, name: "Casing Pressure"};
                }
                if(metric === 'waterTemp'){
                    return {metric: metric, name: "Water Temperature"};
                }
                return null;
            })
            state.metricList = namedMetrics; 
            console.log(namedMetrics);
            // state.metricList = action.payload; 
        },
        metricData: (state, action) => {
            state.metricData = action.payload;
        },
        metricUpdate: (state, action) => {
            //Mutating metricData:
            const update = state.metricData.find((element, index) => {
                return element.metric === action.payload.metric;
            });
            update.measurements.push(action.payload);
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