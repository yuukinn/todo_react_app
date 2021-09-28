import firebase from "firebase/compat/app";
import {db} from "./firebase"

//pointのデータをrtに代入
export const InitGet = async(uid) => {
   const rt = await db.collection("point")
   .orderBy("createAT", "desc")
   .where("uid", "==", uid)


   return rt.get().then((snapshot) => {
       let rts = []
       snapshot.forEach((doc) => {
           rts.push({
               id: doc.id,
               text:doc.data().text,
           })
       })
       return rts
   })
}

//pointにデータを追加
export const addRefect = (text, uid) => {
    db.collection("point").add({
        text:text,
        uid:uid,
        createAT:firebase.firestore.FieldValue.serverTimestamp()
    })

}

//pointのデータを削除
export const refectDelete = (id) =>{
    db.collection("point").doc(id).delete();
}
