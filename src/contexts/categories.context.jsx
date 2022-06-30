import { useEffect, useState } from "react";
import { createContext } from "react"
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    // Run only once to insert data
    // useEffect(() => {
    //     addCollectionsAndDocuments('categories',SHOP_DATA);
    // },[])

    useEffect(() => {
        // if we use asychrous inside of useEffect
        // then create asyc function inside of useEffect instead of useing async callback function 
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoryMap();
    }, []);
    const value = { categoriesMap };
    return (<CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>);
}