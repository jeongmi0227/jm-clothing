// Cannot use a route component unless its immediate parent is a route component from react router dom.
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preivew/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // if we use asychrous inside of useEffect
        // then create asyc function inside of useEffect instead of useing async callback function 
        const getCategoryMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            console.log(categoriesArray);
            dispatch(setCategories(categoriesArray));
        }
        getCategoryMap();
      }, []);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />}/>
        </Routes>

    )
}

export default Shop;