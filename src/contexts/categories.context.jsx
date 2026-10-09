import { createContext, useState,useEffect } from "react";

import  {getCategoriesAndDocuments}  from "../utils/firebase/firebase.utils.jsx";
//import SHOP_DATA from '../shop-data.js';
//PRODUCTS is just a variable, it can be anything

export const CategoriesContext = createContext({
    categoriesMap:[],

});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({});
    //we are exporting these products and hence different components rely on SHOP_DATA, 
    // we are using a empty array.
    //Now , we go to firebaseutils to create a method that allows to upload these categories 
    //from SHOP_DATA into respective collections up in the store

    //I delete this use effect, because every time you 
    // run it, it's going to try and set new values inside of the database, 
    // which we don't want to do.
    /*useEffect(() => {
        //categories - name of collection
        addCollectionAndDocuments('categories',SHOP_DATA);
    },[])*/

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[])
   //1. Component renders
   // 2.useEffect runs
   // 3.getCategoriesMap() is called
   // 4.getCategoriesAndDocuments() is awaited
   // 5.When data comes back,
   // 6.setCategoriesMap(categoryMap) updates state
   
    //When that Provider mounts (appears in the UI for the first time), 
    // anything inside its useEffect with an empty dependency array will run once.

    const value = {categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}