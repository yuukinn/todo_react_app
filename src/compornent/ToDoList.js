import React from 'react';
import * as Api from "../service/api"
import { ListItem,ListItemIcon, ListItemText,ListItemSecondaryAction , IconButton, Checkbox} from "@mui/material";
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
    ul: {
        paddingLeft: 0,
        listStyle: 'none',
    }
}))
const ToDoList = (props) =>{
    const classes= useStyles();
//mydataのドキュメントを削除し更新
    const deleteHandle = (id) =>{
        Api.todoDelete(id);
        props.fetch()
    }

const checkHandle = async(id) => {
// Api経由でcompletedの値を更新
   await Api.togglecompleate(id);
    props.fetch();
}
    const todoList = props.todos.map((mydata) =>{
        return (
           
　　　　　//propsをもとにリストを作成
            <ListItem key={mydata.id}>
                  <ListItemIcon>
                      <Checkbox checked={mydata.compleated} onChange={() => checkHandle(mydata.id)}  />
                  </ListItemIcon>
                  <ListItemText primary={mydata.content}/>
                  <ListItemSecondaryAction>
                  <IconButton edg="end" aria-label="delete" onClick={() => deleteHandle(mydata.id)}>
                        <DeleteIcon/>
                  </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        )
    })
   


    return(
        <div className={classes.root}>
            <ul className={classes.ul}>{todoList}</ul>
        </div>
    )
}
export default ToDoList
