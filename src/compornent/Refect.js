import React from 'react';
import * as Apii from "../service/apii"
import { ListItem, ListItemText,ListItemSecondaryAction , IconButton, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from  "@mui/styles";


const useStyles = makeStyles(() =>  ({
    root: {
        maxWidth: 360,
        margin: 'auto',
    },
    list: {
        justifyContent: 'space-between',
    },

    
}))


const RefectList = (props) => {
    const classes= useStyles();
    const DeleteHle= (id) =>{
        Apii.refectDelete(id)
        props.fh();
    }
    const refectList = props.texts.map((point) =>{
        return (
            <ListItem key={point.id}>
            <ListItemText primary={point.text}/>
            <ListItemSecondaryAction>
            <IconButton edg="end" aria-label="delete" onClick={() => DeleteHle(point.id)}>
                  <DeleteIcon/>
            </IconButton>
            </ListItemSecondaryAction>
      </ListItem>  
         
        )
    })
   


    return(
        <div className={classes.root}>
            <ul>{refectList}</ul>
        </div>
    )
    
}
export default RefectList
