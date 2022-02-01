import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { getPlacesData, getWeatherData  } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { LoadScript } from '@react-google-maps/api';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({ });
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [weatherData, setWeatherData] = useState([]);


    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
       navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
          setCoordinates({ lat: latitude, lng: longitude });
       })
    },[])

    useEffect(() => {
       const filteredPlaces = places.filter((place) => place.rating > rating);

       setFilteredPlaces(filteredPlaces);
    },[rating])

    useEffect(() => {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews));
                setFilteredPlaces([]);
                setIsLoading(false);
            })
        }
 
    },[type, bounds])

    return (
        <LoadScript libraries={["places"]} googleMapsApiKey={apiKey}>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{ width: '100%' }}>
               <Grid item xs={12} md={4}>
                  <List 
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                  />
               </Grid>
               <Grid item xs={12} md={8}>
                  <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                    weatherData={weatherData}
                  />
               </Grid>
            </Grid>
        </LoadScript>
    )
}

export default App;