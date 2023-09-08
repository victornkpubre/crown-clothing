import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category.component';
import { useDispatch } from 'react-redux';
import { setCategoriesMap } from '../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';


const Shop = () => {
    const dispatch = useDispatch();
    console.log("useEffect");

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments();
            console.log(categories);
            dispatch(setCategoriesMap(categories));
        }
        getCategories();
    }, [dispatch]);


    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    );
}

export default Shop;