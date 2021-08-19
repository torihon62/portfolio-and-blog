import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

interface IdName {
  id: string;
  name: string;
}

interface Props {
  items: IdName[];
  onChange: (items: IdName[]) => void;
  value: IdName[];
}

export const SearchField = (props: Props) => {
  const classes = useStyles();

  const onChange = (_: unknown, value: IdName[]) => {
    props.onChange(value);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        options={props.items}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.id === value.id}
        value={props.value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} variant="standard" label="カテゴリ" />}
      />
    </div>
  );
};
