import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'



//components
import Home from './components/Home'
import Signin from './components/Signin.js';
import DailyTasks from './components/DailyTasks';
import Header from './components/Header'
import Notebooks from './components/Notebooks'
import BookPage from './components/BookPage'

import './styles/styles.css'

const App = () => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

const renderHome = () => (
<Home user={user} setUser={setUser} />
)

const renderSignin = () => (
<Signin user={user} setUser={setUser} />
)

const renderDaily = () => (
<DailyTasks user={user} setUser={setUser} />
)

const renderBooks = () => (
<Notebooks />
)

const renderBookPage = (props) => (
<BookPage theprops={props} />
)

return(
<Router>

<Header user={user} setUser={setUser} />

<Route path="/" exact render={renderHome} />
<Route path="/register" render={renderSignin} />
<Route path="/dailytasks" render={renderDaily} />
<Route path="/notebooks" render={renderBooks} />
<Route path="/bookpage/:id" render={renderBookPage} />


</Router>
)
}

export default App;