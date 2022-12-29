import firebase from 'firebase/compat/app';
import firebaseConfig from './config';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



class Firebase {
    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.storage = firebase.storage();
    }
    // Registrar un usuario
    async registrar(nombre,email,password, avatar) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email,password);
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre,
            photoURL: avatar
        });

    }
    // Iniciar Session del usuario
    async login(email,password) {
        return this.auth.signInWithEmailAndPassword(email,password);
        
    }
    // Cierra la session del usuario
    async cerrarSession() {
        await this.auth.signOut();
    }
}

const myFirebase = new Firebase();




export default myFirebase;