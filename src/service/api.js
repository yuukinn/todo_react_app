import firebase from "firebase/compat/app";
import {db} from "./firebase"


//mydataの情報をtodoに代入
export const initGet = async(uid) => {
   const todo = await db.collection("mydata")
   .orderBy("times", "desc")
   .where("uid", "==", uid)


   return todo.get().then((snapshot) => {
       let todos = []
       snapshot.forEach((doc) => {
           todos.push({
               id: doc.id,
               content:doc.data().content,
               compleated: doc.data().compleated
           })
       })
       return todos
   })
}
// mydataにデータを追加

export const add = (content, uid) => {
    db.collection("mydata").add({
        content: content,
        uid: uid,
        compleated: false,
        times:firebase.firestore.FieldValue.serverTimestamp()
    })

}
//mydataのデータを削除
export const todoDelete = (id) =>{
    db.collection("mydata").doc(id).delete();
}

export const togglecompleate = async(id) => {
    const todo = await db.collection("mydata").doc(id).get();
    return db.collection("mydata").doc(id).update({
//もしチェックされたTodoが未了の場合compleatedをtrue,完了の場合はTrue
          compleated: todo.data().compleated ? false : true,
      })
}
