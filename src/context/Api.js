import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, query, where, deleteDoc, updateDoc, onSnapshot   } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as st from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyC_YPbgewHXM_GtGYyQTI8I4rFQCWOqtn8",
    authDomain: "municipality-b179d.firebaseapp.com",
    projectId: "municipality-b179d",
    storageBucket: "municipality-b179d.appspot.com",
    messagingSenderId: "952540645244",
    appId: "1:952540645244:web:129d4269d2e120d3b246f9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const createData = async (tableName,docId,data) => {
    try {
        await setDoc(doc(db, tableName, docId), data);
        return true;
    } catch (e) {
        return false;
    }
}
export const userLogin = async (phoneNumber,password,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "users"), where("phoneNumber", "==", phoneNumber), where("password", "==", password)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getDirectories = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "directory")));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getGallery = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "gallery"), where("businessId", "==", phoneNumber)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getNotice = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "notice")));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getFaqs = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "faqs")));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getComplaints = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "complaints")));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getChats = async (cb) => {
    try {
        const unsubscribe = onSnapshot(query(collection(db, "chats")), (querySnapshot) => {
            /*const data = querySnapshot.docChanges().map((change) => {
                if (change.type === "added") {
                    const message = change.doc.data();
                    return {...message,createdAt:message.createdAt.toDate()}
                }
            }).sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime());
            https://www.youtube.com/watch?v=UvIzZC8IvPE
            https://www.youtube.com/watch?v=WB6V2EtRAXY
            https://youtu.be/0hF642Pg_sY
            https://www.youtube.com/watch?v=CUSUAmHQ_7E
            https://www.youtube.com/watch?v=6ErrfwzIja0
            cb(data)*/
            const messagesFireStore = querySnapshot.docChanges().filter(({type})=>type=='added').map(({doc})=>{
                const message = doc.data();
                return {...message,createdAt:message.createdAt.toDate()}
            }).sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime())
            cb(messagesFireStore)
        });
        return () => unsubscribe();
    } catch (e) {
        cb(e);
    }
}
export const getMedia = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "media")));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const deleteData = async (tableName,docId) => {
    try {
        const q = await deleteDoc(doc(db, tableName, docId));
        return q;
    } catch (e) {
        return false;
    }
}
export const updateTable = async (tableName,docId,obj) => {
    try {
        const docRef = doc(db, tableName, docId);
        await updateDoc(docRef, obj);
        return true;
    } catch (e) {
        return false;
    }
}
export const uploadFile = async (file,path,cb) =>{
    const storage = st.getStorage(app);
    const fileRef = st.ref(storage, path);
    const response = await fetch(file);
    const blob = await response.blob();
    const uploadTask = await st.uploadBytesResumable(fileRef, blob);
    const url = await st.getDownloadURL(uploadTask.ref);
    cb(url)
}