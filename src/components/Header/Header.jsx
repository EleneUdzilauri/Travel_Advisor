import React, { useState } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box  } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import useStyles from './styles';

const Header = ({ setCoordinates }) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);
  
    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    }

    return (
        <AppBar position='static'>
           <Toolbar className={classes.toolbar}>
              <Typography variant='h5' className={classes.title}>
                  Travel Advisor
              </Typography>
              <Box display='flex'>
                <Typography variant='h6' className={classes.title}>
                    Explore new places
                </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchOutlinedIcon/>
                        </div>
                        <InputBase 
                         style={{ paddingLeft: '50px', color: 'white'}}
                            placeholder='Search...' 
                            classes={{ 
                                root: classes.inputRoot, 
                                input: classes.inputInput
                            }}
                        />
                        </div>
                    </Autocomplete>
              </Box>
           </Toolbar>
        </AppBar>
    )
}

export default Header;