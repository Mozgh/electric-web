import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './components/Login';
import UserPanel from './components/UserPanel';
import Data from './components/Data';
import 'antd/dist/antd.css';

function RouterConfig({ history }) {
  return (
      <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/user" exact component={UserPanel} />
        <Route path="/data" exact component={Data} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
