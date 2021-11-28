import React, { useContext } from "react";
import dig from "object-dig"
import { AuthContext } from "../providers/Auth.Provider";
import {signWithGoogle, logOut} from "../service/firebase"
import { makeStyles } from  "@mui/styles";
import  Button  from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const useStyles = makeStyles (()=>({
  toolbar: {
      justifyContent: 'space-between'
  },
  button: {
      color: '#FFF'
  }
}))



function Header ()  {
  const currentUser = useContext(AuthContext);

  const buttonDsiplay = () => {
      let buttonEl
      if( dig(currentUser, 'currentUser','uid')){
        //ログインしていた場合
          buttonEl = <Button className={classes.button} variant='inherit' onClick={logOut}>Logout</Button>
      }else{
        //もしログインしていなかったら
          buttonEl = <Button className={classes.button} variant='inherit' onClick={signWithGoogle}>Login</Button>
      }
      return buttonEl
  }
    const classes = useStyles();
    return(
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">
                 ToDoアプリ
              </Typography>
              {buttonDsiplay()}
            </Toolbar>
        </AppBar>
    )
}
export default Header;
