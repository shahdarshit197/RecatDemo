import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GetUser } from './components/GetUser';
import { AddUser } from './components/AddUser';  

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/GetUser' component={GetUser} />
    <Route path='/AddUser' component={AddUser} />
    <Route path='/user/EditUser/:id' component={AddUser} />  

</Layout>;
    