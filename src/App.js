import './App.css';
import React, { Component, Fragment } from 'react';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route } from 'react-router-dom';
import ShopPage from './shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'

class App extends Component {


  unsubscribeFromAuth = () => null;

  componentDidMount() {
    
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
      
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {

      return (
        <Fragment>
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUp} />
          </Switch>
        </Fragment>
    )
  }
}

const mapDispatachToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatachToProps)(App);
