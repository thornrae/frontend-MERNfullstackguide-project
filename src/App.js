import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users.js';
import NewPlace from './places/pages/NewPlace.js';
import UserPlaces from './places/pages/UserPlaces.js';
import UpdatePlace from './places/pages/UpdatePlace.js';
import Auth from './user/pages/Auth.js';
import MainNavigation from './shared/components/Navigation/MainNavigation.js';
import {useAuth} from './shared/hooks/auth-hook';
import {AuthContext} from './shared/context/auth-context.js';
// bullshit to make change to merge in github


function App() {
  const {token, login, logout, userId} = useAuth();


  let routes;

  if(token) {
    routes = (
      <Switch>
      <Route path="/" exact> 
        <Users />
      </Route>

      <Route path="/:userId/places" exact> 
        <UserPlaces />
      </Route>

      <Route path="/places/new" exact> 
        <NewPlace />
      </Route>

      <Route path="/places/:placeId"> 
        <UpdatePlace />
      </Route>

      <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
      <Route path="/" exact> 
        <Users />
      </Route>

      <Route path="/:userId/places" exact> 
        <UserPlaces />
      </Route>

      <Route path="/auth" > 
        <Auth />
      </Route>
      <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
<AuthContext.Provider 
  value={{isLoggedIn: !!token, token: token, userId: userId, login: login, logout:logout}}
>
    <Router>
      <MainNavigation />
      <main>
        {routes}
      </main>
    </Router>
  </AuthContext.Provider>
    )
}

export default App;
