import { initializeApp } from 'firebase/app';
//initializeApp is the function that:
// Initializes and configures your Firebase app using a config object.
// It sets up the connection between your web app and your Firebase project
import {getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
onAuthStateChanged,
} from 'firebase/auth'
//It's using these that we're able to create our Google sign in.This is just very specific setup for Firebase.
//createUserWithEmailAndPassword=> It’s a function provided by Firebase to register 
// a new user using their email and password.it uses email-password sign-up

//GoogleAuthProvider=>provider, third-party sign-in.


import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';

//Initializes and gives you access to your Cloud Firestore database.
//Creates a reference to a specific document in a collection.
//Reads/fetches data from a document.
//Creates or overwrites a document with data.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfjwdVvcES_g1v47OKTs7DJvzmJewWE6w",
  authDomain: "crwn-clothing-db-f1e46.firebaseapp.com",
  projectId: "crwn-clothing-db-f1e46",
  storageBucket: "crwn-clothing-db-f1e46.firebasestorage.app",
  messagingSenderId: "960341815255",
  appId: "1:960341815255:web:4224b3be4acb204718a592",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); //these providers are instantiated because there are different providers
//google,FB,github.

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth(); // whereas getAuth is not instantiated like providers.
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
//signInWithPopup=>It's a built-in Firebase Auth function.
//It opens a popup window for Google Sign-In (or any other provider you pass) and handles the login flow.
//auth=>Your initialized Firebase Auth instance
//googleProvider=>	An auth provider like new GoogleAuthProvider()  
// so when calling signInWithPopup, opens google login popup , lets the user sign in , returns a object.



export const db = getFirestore();

//this function creates new documents as well as the actual documents inside of that collection.
//collectionKey => we'll see inside the DB (Eg:categories under start collection)
//objectsToAdd => actual document we need to add
// async because we're adding to external resource, calling an API to store data
export const addCollectionAndDocuments = async (collecionKey,objectsToAdd,field) =>
{
  const collectionRef = collection(db,collecionKey) // creating a collection reference
  // this gives access to specific group of documents so you can do:
  //1.add documents inside a collection
  //2.fetch all documents inside a collection
  //3.create document references within that collection
  //4.run queries on collection

  //To make sure all of our objects that we're trying to add to the collection are successfully
  //added , we have to now create a batch so that we can add all of our objects to this collection
  //in one successful transaction => this is called as atomic write on docs

  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    //We added an additional batch set call on there, creating a new document reference for
    //  each of those objects where the key is the title and the value is the object itself.
    // So now we say batch commit and this will begin firing it off.
    const docRef = doc(collectionRef,object[field].toLowerCase());
    batch.set(docRef,object);
  })
  
  await batch.commit();
  console.log('done');
  
}



//getCategoriesAndDocuments fetches all documents under the "categories" collection from 
// Firestore and converts them into a JavaScript object (map) where:
//{"hats": [...items],"jackets": [...items],...}
export const getCategoriesAndDocuments = async () =>
{
  const collectionRef = collection(db,'categories');
  //db → Your Firestore database instance (created using getFirestore()).
  //collection() → Firestore function that returns a reference to a collection.
  //'categories' → The name of the collection in your Firestore database.
  //creating a reference to the categories collection in Firestore.
  //reference => A reference doesn’t fetch data by itself — it just points to a place in Firestore

  const q = query(collectionRef);
  //collectionRef => reference to firestore collection like 'categories'
  //query() =>creates query object to fetch or listen data

  const querySnapshot = await getDocs(q);
  const categoriesArray = querySnapshot.docs.map((doc) => doc.data());

  return categoriesArray;

//querySnapshot.docs=> array of documents
//docSnapShot.data() => converts a Firestore document into a normal JavaScript object.
//runs a Firestore query
// gets all matching documents
// converts each document into plain JS objects
// and returns them as an array







  //querySnapshot => object that contains all results, metadata, and utility methods.
  //getDocs =>  asynchronous ability to fetch those document snapshots that we want because 
  // now it's all encapsulated under this query snapshot.
  //It does not fetch data yet — only points to the location.
  //Returns a snapshot containing all docs retrieved.
   //if we dont give parameter to getDocs,
  //firestore do not know which documents to fetch
  // we have to pass a reference or query as parameter
  

  //const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
    //querySnapshot.docs => An array of document snapshots

    //EG:[{ data: () => ({ title: "Hats", items: [...] }) },
    // { data: () => ({ title: "Jackets", items: [...] }) }]

    //Use .reduce() to transform the array of docs into a single mapped object, i.e,
    //To convert an array into a single object

    //INPUT => Array of documents
    //OUTPUT =>{hats: [...],jackets: [...]}

    //acc=> initial value {}
    //docSnapShot=>Each iteration gives one Firestore document. 

    //const {title,items} =  docSnapshot.data();
    //docSnapshot.data() returns the actual data stored in a Firestore document as a 
    // plain JavaScript object.
    //acc[title.toLowerCase()] = items;
    //return acc; //Whatever you return becomes the accumulator for the next iteration
    //without it accumulator becomes undefined
  //},{});

  //return categoryMap;

  //FINAL OP:categoryMap = {hats: [...],jackets: [...],sneakers: [...]};

  //first argument {}=> the callback that gets invoked on each document snapshot.
  //second argument {} => final object want to create
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => { 
//userAuth is the authenticated user object returned by Firebase after login/sign-up
//we may some time get displayName or do not get it inside the userAuth object. So in that case,we get additional information.
//additionalInformation=>object and by default it is empty.
//
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); //this line creates a reference to the document

    console.log(userDocRef);// object that reference some document reference in the database.
    //creates a reference to where the document would exist in Firestore.
    //It doesn’t care if the users collection or the document exists yet.
    // its a document reference object.

    const userSnapshot = await getDoc(userDocRef);
    //The snapshot allows us to check whether or not there is an instance of it that exists inside of our database.
    // also allows us to access data.
    console.log(userSnapshot); 
    console.log(userSnapshot.exists());// false 
    // // we can check whether a document exists or not using this object.


    //if user data doesnt exists
    if(!userSnapshot.exists())
    {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        //create or overwrite the document at the specified path.
        //if there's no diplay name in userAuth object, then displayName will be set as null,
        //but when we add additional information ourselves, it will be like additionalInformation = {displayName:'mike'}
        // and this overwrites the null value
          await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          });
      }
      catch(error){
        console.log('error creating a user', error.message);
      }
    }
    //if the user data exists
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
//async function because we're going to be setting some values asynchronously inside a firebase.
//method to create a new auth user with email and password and this will create a authenticated user
//and give us back some off object.
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
//async function because we're going to be setting some values asynchronously inside a firebase.
//the function signInWithEmailAndPassword is used to log in a user with their email and password.
//f successful, returns a userCredential object which contains:user object (with details like UID, email, etc.)
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth); //signOut(auth) is the actual Firebase method to log out a user.
//So this we can also make an async function because what we want to return is the promise of whatever sign out returns back to us.

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);
//parameters that can be passed upon onAuthStateChanged:
//1)auth=>the auth instance
//2)nextOrObserver=> callback triggered on change
//3)error callback triggers on error
//4)complete callback=>triggers when observer is removed



//what this observer does is it returns you back whatever you get back from onAuthStateChanged in 
// order for onAuthStateChanged to work.
//onAuthStateChanged takes two parameters : auth, callback=>this callback will run whenever the auth state is changed.
//onAuthStateChanges is an open listener.This means that the moment you set it, this thing is always waiting 
// to see whether or not all states are changing.And the moment it does, it will run a callback.


//FLOW OF onAuthStateChanged:
//1:Component renders for the first time
//  -React sees the useEffect(() => {...}, []) in userContext.jsx
//  -Because the dependency array is [], React schedules this effect to run after the component is mounted (not during render).
//2:Effect runs (after mount)
//  -Inside the effect, onAuthStateChangedListener is called.
//  -That calls onAuthStateChanged(auth, callback).
//3:What onAuthStateChanged does (Firebase internals)
//  -Sets up an observer that watches for changes to the authentication state 
//      (e.g., a user signs in, signs out, or Firebase restores a user session).
//  -Immediately when the listener is attached, Firebase fires the callback once with the current user state:
//4:Your callback runs
//  -logs current user
//  -Later, whenever the auth state changes, Firebase will call this callback again with the updated user.
//5:Component unmounts (e.g., navigate away)
//React calls the cleanup: unsubscribe().
//Listener is removed from Firebase.
//After this, console.log(user) will no longer run, even if the auth state changes.


//LISTENER has three key methods:
//1)next =>it is called every time a new event in stream happens.it points out to the callback
//2)error => this is error callback and gets called whenever we throw an error.
//3)complete => When the events of stream comes to end, the complete callback will be called