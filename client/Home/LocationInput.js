import React from 'react';
import { Box, Container, Typography, TextField, Grid, Card, 
    CardContent, Paper, Rating, FormControl, InputLabel, OutlinedInput,
    IconButton, InputBase, Divider, CardMedia, Chip, Stack, ListItem
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const LocationInput = () => {
    return(
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <LocationOnIcon /> 
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Your location... (zipcode, address)"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton> */}
        </Paper>
    )
}

export default LocationInput