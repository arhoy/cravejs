import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  products: productsReducer,
  cart: cartReducer,
  order:orderReducer
});
