import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Customer from './pages/customer'
import Transaksi from './pages/transaksi'
import Admin from './pages/admin'
import Product from './pages/product'

export default class Main extends React.Component{
    render() {
        return(
            <switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/customer' component={Customer}/>
                <Route path='/transaksi' component={Transaksi}/>
                <Route path='/admin' component={Admin}/>
                <Route path='/product' component={Product}/>
            </switch>
        )
    }
}