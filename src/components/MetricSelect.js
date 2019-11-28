import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 750,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

// function getStyles(name, metricName, theme) {
//   return {
//     fontWeight:
//       metricName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelect(props) {
  const classes = useStyles();
  // const theme = useTheme();

  const dispatch = useDispatch();
  
  const selected = useSelector(state => state.metrics.metricSelect);
  const metricList = useSelector(state => state.metrics.metricList);

  const handleChange = event => {
    dispatch({ type: 'METRIC_SELECT', payload: event.target.value  });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="chip-label">Select Metrics:</InputLabel>
        <Select
          labelId="chip-label"
          id="mutiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {metricList.map(metric => (
            <MenuItem key={metric} value={metric}>
              {metric}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
