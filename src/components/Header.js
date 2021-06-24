import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

const Header = ({user, setUser}) => {

const history = useHistory()
const [showTaskMenu, setShowTaskMenu] = useState(false)
const [settingsMenu, setSettingsMenu] = useState(false)

const [mobOpen, setMobOpen] = useState(false)

const mobomenuActive = () => {

setMobOpen(!mobOpen)
    
}

const logOutFunc = () => {
localStorage.removeItem('profile')
setUser(null)

setShowTaskMenu(false)
setSettingsMenu(false)

}
const renderNormalMenu = () => (
<React.Fragment>
    <li className="header-li">
        <Link to="/register" className="header-link">Sign in</Link>
    </li>
</React.Fragment>
)

const rProfileMenu = () => (
<React.Fragment>
    <li className="header-li">
        <button onClick={() => {
                history.push('/')
                setMobOpen(false)
            }}
         className="profile-btn">Tasks</button>
    </li>
    <li className="header-li">
        <button onClick={() => {
        history.push('/notebooks')
        setMobOpen(false)
    }}
         className="profile-btn">Notebook</button>
        
    </li>
    <li className="header-li">
        <button onClick={() => {
        history.push('/getadvice')
        setMobOpen(false)
    }}
         className="profile-btn">Advice</button>
        
    </li>
    <li className="header-li">
        <button onClick={() => {
            setSettingsMenu(!settingsMenu)
            setMobOpen(false)
        }}
         className="profile-btn">Settings</button>
        <ul className={settingsMenu ? 'show-settings-menu' : 'hide-menu'}>
            <li onClick={() => {
            history.push('/accounts')
            setShowTaskMenu(false)
            setSettingsMenu(false)
            }}
             className="profile-li">Accounts</li>
            <li onClick={logOutFunc}
             className="profile-li">Log Out</li>
        </ul>
    </li>
</React.Fragment>
)

const rProfileMobo = () => (
<React.Fragment>
<div className={!mobOpen ? "mobo-box": "mobo-box-open"} onClick={mobomenuActive}>
    <div className="mobobx-line"></div>
</div>
</React.Fragment>
)


useEffect( () => {
let theWhole = window.document.querySelector('body')
if(!mobOpen){
theWhole.style.overflow = "scroll";
theWhole.style.overflowX = "hidden";
}else{
theWhole.style.overflow = "hidden"
theWhole.style.overflowX = "hidden";
}
}, [mobOpen])



return (
<header className={user ? '' : 'headerBig'}>
<h2 onClick={e => history.push('/')} style={{cursor: 'pointer'}}
className="logo-name">{user ? user.result.fullname.charAt(0).toUpperCase()+user.result.fullname.slice(1) : 'beProductive'}</h2>

<ul className="header-ul">
    {user ? rProfileMenu() : renderNormalMenu()}
</ul>

<ul className="header-ul-mobile">
    {user ? rProfileMobo() : renderNormalMenu()}
</ul>

<div className={ mobOpen ? "mobo-down-menu" : "mobo-left-menu"}>
<img src="./images/myicon.png" alt="beproductive app" className="mobo-logo" />
    <div className="mb-centerbx">
        <li className="header-li-mobo">
        <button onClick={() => {
                history.push('/')
                setMobOpen(false)
            }}
            className="profile-btn-mobo">Tasks</button>
        </li>
        <li className="header-li-mobo">
        <button onClick={() => {
            history.push('/notebooks')
            setMobOpen(false)
            }}
            className="profile-btn-mobo">Notebook</button>
        </li>
        
        <li className="header-li-mobo">
        <button onClick={() => {
            setMobOpen(false)
            history.push('/accounts')
        }}
        className="profile-btn-mobo">Accounts</button>
        </li>
        <li className="header-li-mobo">
        <button onClick={() => {
            setMobOpen(false)
            history.push('/getadvice')
        }}
        className="profile-btn-mobo">Random Advice</button>
        </li>
        <li className="header-li-mobo">
        <button onClick={() => {
            logOutFunc()
            setMobOpen(false)
        }}
            className="profile-btn-mobo">Sign Out</button>
        </li>
    </div>
</div>

</header>
)
}

export default Header
