import * as React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as Combobox,
} from '@mui/material';

const renderFilters = (item: any) => (
  <MenuItem key={item.id} value={item.id}>
    {item.label}
  </MenuItem>
);

export default function Select(props: any) {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel>{props.title}</InputLabel>
      <Combobox
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.handleChange}
      >
        {props.list.map((item: any) => renderFilters(item))}
      </Combobox>
    </FormControl>
  );
}
