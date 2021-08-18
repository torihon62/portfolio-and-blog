import { BLOG_PER_PAGE } from '../interfaces/consts';
import { Pagination as MuiPagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface Props {
  totalCount: number;
  page: number;
  onChange: (value: number) => void;
}
export const Pagination = ({ totalCount, page, onChange }: Props) => {
  const classes = useStyles();

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
  const pageCount = range(1, Math.ceil(totalCount / BLOG_PER_PAGE)).length;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <div className={classes.root}>
      <MuiPagination count={pageCount} page={page} onChange={handleChange} />
    </div>
  );
};
