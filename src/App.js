import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import baseStyles from './base-styles';
import { Block } from 'react-super-styled';
import Home from './containers/Home';
import Photo from './containers/Photo';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import Collection from './containers/Collection';



const AsyncCollection = asyncComponent(() => {
    return import('./containers/Collection');
});
class App extends Component {

  render() {
    baseStyles()
    return (
      <BrowserRouter>
        <Block styles="width: 80%; margin: auto">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/collection/:colId" component={AsyncCollection} />
            <Route path="/photos/:photoId" component={Photo} />
          </Switch>
        </Block>
      </BrowserRouter>
    );
  }
}

export default App;
