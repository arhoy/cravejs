import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
  // import { clearCurrentProfile } from './actions/profileActions';


import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import HomePage from './pages/homepage/HomePage';

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

import DashboardPage from './pages/dashboard/DashboardPage'
import EditProfilePage from './pages/dashboard/EditProfilePage';
import CreateProfilePage from './pages/dashboard/CreateProfilePage';

import AddEducationPage from './pages/addEditCredentials/AddEducationPage';
import AddExperiencePage from './pages/addEditCredentials/AddExperiencePage';

import ResumeUploadPage from './pages/resume/ResumeUploadPage';

import ProfilePage from './pages/profiles/ProfilePage';
import PostsPage from './pages/posts/PostsPage';
import ProductsPage from './pages/products/ProductsPage';

import ProductPage from './pages/products/ProductPage';
import CartPage from './pages/cart/CartPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
      faEnvelope, faChartLine, faCode, faDatabase,
      faKey, faThumbsUp, faEllipsisH, faIgloo, faUserFriends,
      faLaptopCode,faUserAstronaut, faTimesCircle,faPlusCircle
 } from '@fortawesome/free-solid-svg-icons';

import ThankYouPage from './pages/thankyou/ThankYouPage';
import UserOrdersPage from './pages/orders/UserOrdersPage';
import UserOrderPage from './pages/orders/UserOrderPage';

import DevelopersPage from './pages/network/DevelopersPage';
import ArticlesPage from './pages/articles/ArticlesPage';
import ArticlePage from './pages/article/ArticlePage';

import ToDoPage from './pages/todo/ToDoPage';
import PortfolioPage from './pages/portfolio/PortfolioPage';

import SearchResultsPage from './pages/searchResults/SearchResultsPage';

import './sass/main.scss';
import NotFoundPage from './pages/notFound/NotFoundPage';











library.add(
     faEnvelope, faKey, faThumbsUp,faEllipsisH,
     faIgloo, faUserFriends, faLaptopCode, faUserAstronaut, faTimesCircle,
     faChartLine,faDatabase,faCode,faPlusCircle
  );


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
       // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store = {store}>
      <Router>
        <Fragment>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <Route exact path = "/developers" component = {DevelopersPage}/>

          <PrivateRoute exact path="/create-profile" component={CreateProfilePage} />
          <PrivateRoute exact path="/edit-profile" component={EditProfilePage} />

          <PrivateRoute exact path="/add-education" component={AddEducationPage} />
          <PrivateRoute exact path="/add-experience" component={AddExperiencePage} />
          <PrivateRoute exact path="/thank-you" component={ThankYouPage} />
          <PrivateRoute exact path="/orders" component={UserOrdersPage} />
          <PrivateRoute exact path="/order/:id" component={UserOrderPage} />
          <PrivateRoute exact path="/resume" component={ResumeUploadPage} />
        
          <Route exact path = "/login" component = {LoginPage}/>
          <Route exact path = "/articles" component = {ArticlesPage}/>
          <Route exact path = "/articles/model/:content-type" component = {ArticlesPage}/>
          <Route exact path = "/articles/:contentType/:slugName" component = {ArticlePage}/>

          <Route exact path = "/portfolios" component = {PortfolioPage}/>

          <Route exact path = "/posts" component = {PostsPage}/>
          <Route exact path = "/products" component = {ProductsPage}/>
          <Route exact path = "/cart" component = {CartPage}/>
          <Route exact path = "/products/:id" component = {ProductPage}/>
          <Route exact path = "/profile/:handle" component = {ProfilePage}/>
          <Route exact path = "/register" component = {RegisterPage}/>

          <Route exact path = "/todo" component = { ToDoPage } />
          <Route exact path = "/search" component = { SearchResultsPage } />
  
          <Route exact path = "/" component = {HomePage}/>
          <Route component = { NotFoundPage }/>
        </Switch>
        </Fragment>
      </Router>
    </Provider>
        
      
    );
  }
}

export default App;
