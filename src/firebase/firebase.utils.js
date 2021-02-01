import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDjY-lOaO7sOvPeE47-HLYGEBdsYkT4jkw",
    authDomain: "crown-db-760f8.firebaseapp.com",
    projectId: "crown-db-760f8",
    storageBucket: "crown-db-760f8.appspot.com",
    messagingSenderId: "222874106030",
    appId: "1:222874106030:web:24909b50c4dca97f5b153f",
    measurementId: "G-3329GEC58G"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // -- checking if we have any data on the user that logged in
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    // -- Snapshot of the user database
    const snapShot = await userRef.get();

    // -- if the snapshot of user doesnt exist, then we need to create new user
    if(!snapShot.exists) {
        
        const { displayName, email } = userAuth;

        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message)
        }
    }
    
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// -- Google Auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;