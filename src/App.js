import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'



//components
import Home from './components/Home'
import Signin from './components/Signin.js';
import DailyTasks from './components/DailyTasks';
import Header from './components/Header'
import Notebooks from './components/Notebooks'
import BookPage from './components/BookPage'

import './styles/styles.css'
import PrivacyPolicy from './components/PrivacyPolicy';
import Accounts from './components/Accounts';
import Sorry from './components/Sorry';

const App = () => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

const [deletedNa, setDeletedNa] = useState(false)

const renderHome = () => (
<Home user={user} setUser={setUser} setDeletedNa={setDeletedNa} deletedNa={deletedNa} />
)

const renderSignin = () => (
<Signin user={user} setUser={setUser} />
)

const renderDaily = () => (
<DailyTasks  setDeletedNa={setDeletedNa} deletedNa={deletedNa}/>
)

const renderBooks = () => (
<Notebooks />
)

const renderBookPage = (props) => (
<BookPage theprops={props} />
)

const renderAcc = () => (
<Accounts user={user} setUser={setUser} setDeletedNa={setDeletedNa} deletedNa={deletedNa} />
)

const renderSorry = () => (
<Sorry deletedNa={deletedNa} setDeletedNa={setDeletedNa} />
)



return(
<Router>

<Header user={user} setUser={setUser} />

<Route path="/" exact render={renderHome} />
<Route path="/register" render={renderSignin} />
<Route path="/notebooks" render={renderBooks} />
<Route path="/bookpage/:id" render={renderBookPage} />
<Route path="/privacypolicy" component={PrivacyPolicy} />
<Route path="/accounts" render={renderAcc} />
<Route path="/farewell" render={renderSorry} />

</Router>
)
}

export default App;