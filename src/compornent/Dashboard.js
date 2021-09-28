import React, {useState, useEffect, useContext} from 'react';
import * as Api from "../service/api"
import * as Apii from "../service/apii"
import { TextField } from '@mui/material';
import  Button  from "@mui/material/Button"
import { makeStyles } from  "@mui/styles"
import dig from "object-dig"
import { AuthContext } from "../providers/Auth.Provider";
import {signWithGoogle} from "../service/firebase"
import ToDoList from './ToDoList';
import RefectList from './Refect';

const useStyles = makeStyles (() =>({
    root: {
     textAlign: "center",
     marginTop: 40,
    　justifyContent: "space-between",
    },
    form: {
      width: "100%",
      TaxWidth: 360,
      margin: "auto",
      marginBottom: 40,
      display:"flex",
      alignItems: "baseline",
      justifyContent: "center"
    },
    input: {
    　marginRight: 10
    },  
  
}))

function DashBoard () {
    const classes = useStyles()
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [texts, setTexts] = useState([])
    const [todos, setTodos] = useState([])

    useEffect(() =>{
       //mydataとpoint一覧を取得
       fetch();
       fh();
    }, [currentUser])

    const fetch = async() =>{
        if(dig(currentUser,'currentUser','uid')) {
            const data = await Api.initGet(currentUser.currentUser.uid)
            await setTodos(data)
        }
    }
    const fh = async() =>{
        if(dig(currentUser,'currentUser','uid')) {
            const datas = await Apii.InitGet(currentUser.currentUser.uid)
            await setTexts(datas)
        }

    }
    const formRender = () => {
        let dom
        //もしログインいていたら、入力フォーム
        if( dig(currentUser, 'currentUser','uid')){
            dom  = <form className={classes.form}>
                <TextField id="standard-basic" label="Standard" variant="standard" placeholder="Today Task" className={classes.input} value={inputName} onChange={(event) => setInputName(event.currentTarget.value)}/>
                <Button  variant='contained' color="primary" size="small" style={{marginLeft:10}}
                 disabled={inputName.length > 0 ? false : true}
                 type="button" onClick={() =>post()}>追加</Button>
            </form>
        }else{
        //もしログインしていなかったら、ログインボタン
        dom　= <button onClick={signWithGoogle}>Login</button>
        }
        return dom 
    }
    const formRenders = () => {
        let Dom
        //もしログインいていたら、入力フォーム
        if( dig(currentUser, 'currentUser','uid')){
            Dom = <form className={classes.form}>
            　　<TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder="TOday introspection " className={classes.input} value={inputValue}onChange={(event) => setInputValue(event.currentTarget.value)}/>
            　　<Button  variant='contained' color="primary" size="small" style={{marginLeft:15}}
             　　disabled={inputValue.length > 0 ? false : true}
             　　type="button" onClick={() =>posts()}>追加</Button>
        </form>
        }else{
        //もしログインしていなかったらなにも返さない
        Dom　= ""
        }
        return Dom
    }
    const Title = ()=>{
        let title
    //もしログインしていたらtitle表示
     if( dig(currentUser, 'currentUser','uid')){
         title=<h2>TODAY Tasks</h2>
    }else{
    //していなかったらなにも返さない
       title=""
    }
    return title
}
const Title2 = ()=>{
    let title2
//もしログインしていたらtitle表示
 　　　if( dig(currentUser, 'currentUser','uid')){
     　　title2=<h2>NEXT IMPROVEMENT POINTS</h2>
　　}else{
//していなかったらなにも返さない
  　　　 title2=""
　　}　　
　　return title2
}

// firedatabase にapiのaddを追加する
    const post = async() => {
      await Api.add(inputName, currentUser.currentUser.uid)
      await setInputName("")
      fetch()
    }
    const posts = async() => {
        await Apii.addRefect(inputValue, currentUser.currentUser.uid)
        await setInputValue("")
        fh()
    }


    return (
        <div className={classes.root}>
            {formRender()}
            <Title/>
            <ToDoList todos={todos} fetch={fetch}/>
            {formRenders()}
            <Title2/>
            <RefectList texts={texts} fh={fh}/>
        </div>
    )
}
export default  DashBoard;
