import React from 'react'
import Header from './Header'
import {Typography, Container} from '@material-ui/core'


import Profile from './Profile'


const Home = ({user, setUser}) => {


if(user){
    return(
        <Profile user={user} setUser={setUser} />
    )
}



return (
<React.Fragment>

<div className="orig-home">
    <div className="oh-top">
        <img src="/images/men.svg" className="menpic" />
    </div>
    <div className="oh-bot">
        <h3 className="ohbot-h">Manage your task everyday</h3>
        <p className="ohbot-p">
            starting your day with a list of task to view will prevent you from
            thinking early in the morning just open the app and start viewing your daily tasks
        </p>
    </div>
</div>

<div className="orig-home-mid">
    <div className="oh-left">
        <h2 className="ol-cap">Be Productive.</h2>
        <p className="ol-p">
        With this app you can manage your daily task very easily
        you can also have a notebook that you can use if something
        important happen in that day so you can always remember because
        it is inside our database.
        </p>
    </div>
    <div className="oh-right">
        <img className="or-img"
        src="/images/ladytask.svg.svg" alt="be productive" />
    </div>
</div>

<div className="orig-home-bottom">
    <img className="oh-b-img"
    src="/images/bot.svg" alt="beproductive app" /> 
    <h2 className="oh-bot-cap">
        start making your first task today
    </h2>
    <button className="oh-bot-btn">Sign Up</button>
</div>

<footer>
    <p className="copyright">copyright beProductive.com 2021</p>
</footer>

</React.Fragment>
)
}

export default Home;
