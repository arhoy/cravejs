import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import resumeReducer from './resumeReducer';
import articlesReducer from './articlesReducer';
import todoReducer from './todoReducer';
import pageHistoryReducer from './pageHistoryReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  products: productsReducer,
  cart: cartReducer,
  order:orderReducer,
  resume:resumeReducer,
  articles:articlesReducer,
  todo: todoReducer,
  pageHistory: pageHistoryReducer
});
