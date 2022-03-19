import React from 'react';
import { Box, Container, Typography, TextField, Grid, Card, 
    CardContent, Paper, Rating, FormControl, InputLabel, OutlinedInput,
    IconButton, InputBase, Divider, CardMedia, Chip, Stack, ListItem
} from '@mui/material';
import { useStyles, FiList, FiChip } from '../styles';

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
    const classes = useStyles();

    return(
        <Paper 
            component="ul"
            className={classes.category}
        >
            { cuisines.map((cuisine, idx) => {
                return (
                
                <FiList key={idx}>
                    <FiChip 
                        label={cuisine}
                        onClick={(ev)=>handleFilter(ev)}
                    ></FiChip>
                    {/* <Chip
                        label={cuisine}
                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        onClick={(ev)=>handleFilter(ev)}
                    /> */}
                </FiList>
                );
            })}

        </Paper>
    )
}

export default Category;