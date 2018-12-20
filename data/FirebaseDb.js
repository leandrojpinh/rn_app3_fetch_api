import firebase from 'firebase';

let config = {
    //professor, colocar aqui os dados do Firebase. 
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

let app = firebase.initializeApp(config);
export const db = app.database();