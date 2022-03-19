import { makeStyles } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material'
import { ListItem, Chip, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core'

export const FiList = withStyles({
    root: {
        position: "relative",
    }
})(ListItem)

export const FiChip = withStyles({
    root: {
        positive: "relative",
        backgroundColor: '#FFF',
        padding: '0, 1.5rem, 0, 1rem',
        colorPrimary: {
            backgroundColor: '#F54747'
        },
        '&:hover': {
            backgroundColor: '#F54747',
            color: '#FFF',
            filter: 'brightness(120%)',
        },
        '&:active': {
            boxShadow: 'none',
            color: '#FFF',
            backgroundColor: '#F54747',
            borderColor: '#FFF',
        },
    }
})(Chip)

export const FiCard = withStyles({
    root: {
        position: "relative",
        // margin: "1rem"
    }
})(Card);

export const FiCardActionArea = withStyles({
    root: {
      position: "relative"
    }
})(CardActionArea);
  
export const FiCardActions = withStyles({
    root: {
      position: "relative"
    }
})(CardActions);

export const FiCardContent = withStyles({
    root: {
      position: "relative",
      backgroundColor: "transparent"
    }
  })(CardContent);

export const FiCardMedia = withStyles({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%"
      }
})(CardMedia);

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
    },
    containerBoth: {
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
        // padding: theme.spacing(4, 0, 6),
        display: 'flex',
        overflow: 'auto',
        maxHeight: '40vh',
        padding: '2rem'
    },
    // containerRest: {
        // marginLeft: '5rem'
    // },
    category: {
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'auto',
        padding: '0',
        maxHeight: '500px',
        minWidth: '180px',
        "&::-webkit-scrollbar": {
            width: 4
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F4F3F3"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#F54747",
            borderRadius: 2
          }
    },
    singleBoxes: {
        display: 'flex',
        flexDirection: 'column',
        // borderRadius: '16px',
        // margin: '5rem'
    },
    card: {
        minWidth: '20vw',
        minHeight: '30vh',
        margin: '2rem',
    },
    media: {
        // height: '140'
    },
    fiCardContent: {
        color: "#ffffff",
        minHeight: '30vh',
        backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.5))",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    comparison: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    pagination: {
        margin: '3rem',
        display: 'flex',
        justifyContent: 'center',
        color: 'red'
    }
}))

export default {
    useStyles,
    FiList,
    FiChip,
    FiCard,
    FiCardActionArea,
    FiCardActions,
    FiCardContent,
    FiCardMedia
}