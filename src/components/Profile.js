import React from 'react'
import {useHistory} from 'react-router-dom'


const Profile = ({user, setUser}) => {

const history = useHistory()

const converUpperCase = theNameUpper => {

return theNameUpper.charAt(0).toUpperCase()+theNameUpper.slice(1)

}

return(
<React.Fragment>


<div className="profile-body">
    <div className="profile-left">
        <div className="image-kunyare">

        </div>
        <h3 className="profile-name">{converUpperCase(user.result.fullname)}</h3>
        <div className="task-info-bx">
            
            <p className="task-captions">Total Tasks</p>
            <p className="task-captions">Completed</p>
        </div>
    </div>
    <div className="profile-right">
        <p className="what-todo">What Todo Today ?</p>
        <div className="todos">
            
            <button onClick={() => {
                history.push('/dailytasks')
            }}
            className="todos-btn">SHOW DAILY TASK</button>
            <button className="todos-btn">CREATE NEW TASK</button>
            <button className="todos-btn">CHECK COMPLETED</button>
            <button className="todos-btn">MANAGE NOTES</button>

        </div>
    </div>
</div>
</React.Fragment>
)
}

export default Profile;