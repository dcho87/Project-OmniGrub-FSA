import { makeStyles } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ListItem, Chip, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core'
// import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material'

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
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
        '& .MuiToolbar-root': {
            backgroundColor: "#E74E35"
        },
        '& .MuiSvgIcon-root': {
            fill: "#E74E35"
        },
        '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: "#E74E35"
        },
        // '& .MuiChip-root.Mui-selected':{
        //     backgroundColor: "#E74E35"
        // },
        '& .MuiCard-root': {
            borderRadius: '16px'
        },
        '& .MuiContainer-root':{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    navBar: {
        color: '#FFF'
    },
    hero: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBoth: {
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
        // padding: theme.spacing(4, 0, 6),
        display: 'flex',
        overflow: 'auto',
        maxHeight: '40vh',
        margin: '1rem',
        padding: '2rem',
        "&::-webkit-scrollbar": {
            width: 1
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#FFF"
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#FFF",
            borderRadius: 2
        }
        
    },
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
        borderRadius: '16px',
        // margin: '5rem'
    },
    card: {
        minWidth: '20vw',
        minHeight: '30vh',
        margin: '2rem',
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
        margin: '2rem',
        display: 'flex',
        justifyContent: 'center',
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