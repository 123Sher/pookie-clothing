//to reuse the current user selector
//contains selection based selectors
 //state => the entire Redux store state
  //current user being referenced here will be the current user object inside of the store.
export const selectCurrentUser = (state) => state.user.currentUser;