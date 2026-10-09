import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/categories.action';
import './shop.styles.scss';
import { fetchCategoriesAsync } from '../../store/categories/categories.action';

//We put <Routes> inside the Shop component because Shop is a parent route 
// that has its own sub-pages.
//Shop is a section with its own routes



//Both of these components, the category preview needs categories map and the category component needs
// the category map.
// So their nearest ancestor is the shop component.
// And the shop page component can actually be the one that fetches the code from our categories context,
// which is to fetch the Firebase API, get down all those documents, create the categories map.





const Shop = () => {
  console.log("SHOP FILE TEST 123");
  const dispatch = useDispatch();



  //Redux by default only accepts plain action objects. 
  // It has no idea how to handle async/await, API calls, or Firestore fetches.
//   dispatch(async () => {
//     const data = await getCategoriesAndDocuments(); // ❌ Redux will throw an error
//     dispatch(setCategories(data));
// });
   useEffect(() => {
    //const getCategoriesMap = async () => 
      //const categories = await getCategoriesAndDocuments('categories');
      //dispatch(setCategories(categories));

      dispatch(fetchCategoriesAsync());
      //Triggers the thunk — hands control to middleware
      //  ↑ This doesn't dispatch an action object
//  ↑ Thunk middleware sees it's a FUNCTION, so it calls it with (dispatch, getState)
//  ↑ The component's job is done here — it just fires and forgets
// thunk => asynchronous side effect event handling inside of Redux.
      
    

    //getCategoriesMap();
  }, []);

      //dispatch is stable
      // it does NOT change between renders
      // So adding it to the dependency array:will NOT cause re-renders or loops.
      // It will still run only once (on mount), just like [].


  return (
    <Routes>
        {/* /shop => <CategoriesPreview />
        /shop/hats => <Category />*/}
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
      {/* Child routes live inside the parent component*/}
	  
	  {/*This is a dynamic route in React Router.:category is a URL parameter.
            It can match any value at that position in the URL */}
            {/* In React Router v6, routes must use the element prop. 
            Child JSX inside <Route> is ignored, which causes components not to render.*/}
    </Routes>
  );
};

export default Shop;

//Any component that renders different UI based on the URL needs its own <Routes>