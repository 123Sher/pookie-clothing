import { createSelector } from "reselect";


//createSelector memoizes your selector
//Memoisation is the process in which you cache the previous value of something,
//It remembers the previous result and returns it again if the inputs did not change.

const selectCategoryReducer = (state) => state.categories; //initial selector function which gets entire redux state,
//from that we just want category's slice of redux store.
//gives us back the slice of the category reducer 


//if the state is :
// state.categories = {
//   categories: [...],
//   isLoading: false
// }
// If categories array changes → ✅ runs
// If isLoading changes → ✅ ALSO runs (important!)
// If nothing inside this slice changes → ❌ does NOT run (memoized)


//this is a memoise selector, which gives us the categories array that lives in slice of redux state
// and WILL RUN WHEN THE OUTPUT OF selectCategoryReducer changes
//takes two arguments =>
    //1)input selector => job is to take the Redux state, and return piece of it
    //2) output selector => output of the inputSelector
//IMPORTANT NOTE: the output selector will run only when the categoryObject we get from inputSelector is different
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories // this is the output of the inputSelector(selectCategoryReducer)
)

//the below selector runs when selectCategories changes
//If selectCategories returns a new array reference → ✅ runs else does not run
// do not rerun this method.
// Of course you want to reduce once, but after that, as long as it has not changed, don't even bother
// rerunning it.
// Just give me back the previously calculated value.
//createSelector => prevents unneccessary recalculation
export const selectCategoriesMap = createSelector(
    [selectCategories], // input selector, gives categories array from redux store
    (categories) => //this runs only when categories array changes
    categories.reduce((acc,category) => { //converts array into object
       
        const {title,items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
)

    
export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)

//state.categories.categories => 
    //[
//   {
//     title: "Hats",
//     items: [...]
//   },
//   {
//     title: "Jackets",
//     items: [...]
//   }
// ]

    //this selector returns {
//   hats: [...],
//   jackets: [...],
//   sneakers: [...]
// }


// Redux State
//    ↓
// selectCategoryReducer
//    ↓
// categoriesSlice (object)
//    ↓
// selectCategories
//    ↓
// categories (array)
//    ↓
// selectCategoriesMap (your previous selector)
//    ↓
// { hats: [...], sneakers: [...] }

//this selector takes the categories array and converts it into categories object keyed by title.

//What “Business Logic in Our Selectors” Means
// In Redux, you have a central store that holds all your app’s state (data). 
// A selector is a function that reads data out of that store for use in your UI.


//Business logic here means transforming the raw state into useful output for your UI.
// Instead of doing that logic in:
// your React components,
// or inside reducers,
// you put it inside selectors so your components stay clean