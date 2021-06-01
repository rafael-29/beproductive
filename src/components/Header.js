import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

const Header = ({user, setUser}) => {

const history = useHistory()
const [showTaskMenu, setShowTaskMenu] = useState(false)
const [settingsMenu, setSettingsMenu] = useState(false)

const showProfileMenu = e => {
setShowTaskMenu(!showTaskMenu)
if(settingsMenu){
    setSettingsMenu(false)
}
}

const logOutFunc = () => {
localStorage.removeItem('profile')
setUser(null)
history.push('/')
setShowTaskMenu(false)
setSettingsMenu(false)
}
const renderNormalMenu = () => (
<React.Fragment>
    <li className="header-li">
        <Link to="/" className="header-link">Home</Link>
    </li>
    <li className="header-li">
        <Link to="/register" className="header-link">Sign in</Link>
    </li>
</React.Fragment>
)

const rProfileMenu = () => (
<React.Fragment>
    <li className="header-li">
        <button onClick={showProfileMenu}
         className="profile-btn">Tasks</button>
        <ul className={showTaskMenu ? 'show-task-menu' : 'hide-menu'}>
            <li onClick={() => {
                history.push('/dailytasks')
                setShowTaskMenu(false)
            }}
             className="profile-li">DailyTask</li>
            <li className="profile-li">TodayTask</li>
        </ul>
    </li>
    <li className="header-li">
        <button onClick={() => history.push('/notebooks')}
         className="profile-btn">Notebook</button>
        
    </li>
    <li className="header-li">
        <button onClick={() => {
            setSettingsMenu(!settingsMenu)
            if(showTaskMenu){
                setShowTaskMenu(false)
            }
        }}
         className="profile-btn">Settings</button>
        <ul className={settingsMenu ? 'show-settings-menu' : 'hide-menu'}>
            <li className="profile-li">Accounts</li>
            <li onClick={logOutFunc}
             className="profile-li">Log Out</li>
        </ul>
    </li>
</React.Fragment>
)



return (
<header className={user ? '' : 'headerBig'}>
<h2 onClick={e => history.push('/')} style={{cursor: 'pointer'}}
className="logo-name">{user ? user.result.fullname.charAt(0).toUpperCase()+user.result.fullname.slice(1) : 'beProductive'}</h2>

<ul className="header-ul">
    {user ? rProfileMenu() : renderNormalMenu()}
</ul>
</header>
)
}

export default Header
