import React from "react";
import Navbar from "./components/navbar";
import MyImages from "./pages/myImages";
import Upload from "./pages/upload";
import PublicImages from "./pages/publicImages";
import FavoritesImages from './pages/favoritesImages'
import 'bootstrap/dist/css/bootstrap.css';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/upload' component={Upload}/>
          <Route path='/my-images' component={MyImages}/>
          <Route path='/public-images' component={PublicImages}/>
          <Route path='/favorites' component={FavoritesImages}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
