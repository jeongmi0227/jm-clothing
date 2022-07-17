import { useState,useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

// memorization is a specific form of caching that involes caching the return value only function
// that is the return value of the function based on its parameters.
const Category = () => {
    const { category } = useParams();
    // Wheneveer any action fires and as long as the reducer updates, it does not matterr which part of the
    // reducer you are listening into. Every single component that has a useSelector will rerun.
    //
    const categoriesMap = useSelector(selectCategoriesMap);
    // const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    // If the component renders, products will not update unless category or categoriesMap has changed.
    useEffect(() => {
        // console.log(category);
        // console.log(categoriesMap);
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
                <CategoryContainer>
                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
                </CategoryContainer>
        </Fragment>
    )
}

export default Category;