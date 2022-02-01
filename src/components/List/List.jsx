import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
       const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

       setElRefs(refs);

    },[places])

    return (
        <div style={{ padding: '25px' }} className={classes.container}>
           <Typography style={{ marginBottom: '20px'}} variant="h4">Restaurants, Hotels & Attractions around you</Typography>
           { isLoading ? (
               <div className={classes.loading}>
                   <CircularProgress size='5rem'/>
               </div>
           ) : ( 
               <>
           <FormControl style={{ minWidth: '120px', marginBottom: '50px' }} className={classes.formControl}>
             <InputLabel variant="standard" htmlFor="uncontrolled-native">Type</InputLabel>
             <NativeSelect inputProps={{name: 'Rating', id: 'uncontrolled-native'}} onChange={(e) => setType(e.target.value)}>
                <option value='restaurants'>Restaurants</option>
                <option value='hotels'>Hotels</option>
                <option value='attractions'>Attractions</option>
             </NativeSelect>
           </FormControl>
           <FormControl style={{ minWidth: '120px', marginBottom: '30px', marginLeft: '20px' }} className={classes.formControl}>
             <InputLabel variant="standard" htmlFor="uncontrolled-native">Rating</InputLabel>
             <NativeSelect inputProps={{name: 'Rating', id: 'uncontrolled-native'}} onChange={(e) => setRating(e.target.value)}>
                <option value={0}>All</option>
                <option value={3}>Above 3.0</option>
                <option value={4}>Above 4.0</option>
                <option value={4.5}>Above 4.5</option>
             </NativeSelect>
           </FormControl>
           <Grid container spacing={3} style={{ height: '75vh', overflow: 'auto' }}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                       <PlaceDetails 
                         place={place}
                         selected={Number(childClicked) === i}
                         refProp={elRefs[i]}
                       />
                    </Grid>
                ))}
           </Grid>
           </>
           )}
        </div>
    )
}

export default List;