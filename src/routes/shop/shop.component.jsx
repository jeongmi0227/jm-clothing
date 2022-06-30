// Cannot use a route component unless its immediate parent is a route component from react router dom.
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preivew/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {
    
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />}/>
        </Routes>

    )
}

export default Shop;