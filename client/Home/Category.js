import React from 'react';
import { Box, Container, Typography, TextField, Grid, Card, 
    CardContent, Paper, Rating, FormControl, InputLabel, OutlinedInput,
    IconButton, InputBase, Divider, CardMedia, Chip, Stack, ListItem
} from '@mui/material';

 // const useStyles = makeStyles((theme) => ({
        //     root: {
        //       display: "flex",
        //       justifyContent: "left",
        //       flexWrap: "nowrap",
        //       listStyle: "none",
        //       padding: theme.spacing(0.5),
        //       margin: 0,
        //       overflow: "auto",
        //       maxWidth: "400px"
        //     },
        //     chip: {
        //       margin: theme.spacing(0.5)
        //     }
        // }));
const Category = ({cuisines, handleFilter}) => {
    
    return(
        <Paper 
            component="ul"
            style={{ 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'auto',
                maxHeight: '400px',
                maxWidth: '200px'
            }}
        >
            { cuisines.map((cuisine, idx) => {
                return (
                <ListItem key={idx}>
                    <Chip
                        label={cuisine}
                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        onClick={(ev)=>handleFilter(ev)}
                    />
                </ListItem>
                );
            })}

        </Paper>
    )
}

export default Category;