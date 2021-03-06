import { makeStyles } from '@mui/styles';
import { alpha, createTheme } from '@mui/material/styles';

const theme = createTheme()

export default makeStyles({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
      },
      searchIcon: {
        padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: '30px', 
        paddingLeft: '20px', 
        transition: theme.transitions.create('width'), 
        width: '100%', 
        [theme.breakpoints.up('md')]: { width: '20ch' },
      },
      toolbar: {
        display: 'flex', justifyContent: 'space-between',
      },
})