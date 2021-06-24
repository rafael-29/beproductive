import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';



//components
import Home from './components/Home';
import Signin from './components/Signin.js';
import DailyTasks from './components/DailyTasks';
import Header from './components/Header';
import Notebooks from './components/Notebooks';
import BookPage from './components/BookPage';
import GetAdvice from './components/getAdvice';

import './styles/styles.css'
import PrivacyPolicy from './components/PrivacyPolicy';
import Accounts from './components/Accounts';
import Sorry from './components/Sorry';

const App = () => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
const [sign, setSign] = useState(true)
const [deletedNa, setDeletedNa] = useState(false)

const renderHome = () => (
<Home user={user} setUser={setUser} setDeletedNa={setDeletedNa} deletedNa={deletedNa}
sign={sign} setSign={setSign} />
)

const renderSignin = () => (
<Signin user={user} setUser={setUser} sign={sign} setSign={setSign} />
)

const renderBooks = () => (
<Notebooks user={user} setUser={setUser} />
)

const renderBookPage = (props) => (
<BookPage user={user} setUser={setUser} theprops={props} />
)

const renderAcc = () => (
<Accounts user={user} setUser={setUser} setDeletedNa={setDeletedNa} deletedNa={deletedNa} />
)

const renderSorry = () => (
<Sorry deletedNa={deletedNa} setDeletedNa={setDeletedNa} />
)
const renderAdvicePage = () => (
<GetAdvice user={user} setUser={setUser}  />
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
<Route path="/getadvice" render={renderAdvicePage} />

</Router>
)
}

export default App;