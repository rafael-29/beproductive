import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import axios from 'axios'



const Accounts = ({user, setUser, setDeletedNa, deletedNa}) => {

const history = useHistory()

const API = axios.create({
baseURL: 'https://beproductive-api.herokuapp.com/users'
})
API.interceptors.request.use( (req) => {

req.headers.authori = `belat ${JSON.parse(localStorage.getItem('profile')).token}`

return req
})

const [updateInfo, setUpdateInfo] = useState({
fullname: '', email: ''
})

const [cPassword, setCpassword] = useState({
newpass: '', oldpass: '', confirm: ''
})

const [updateOpen, setUpdateOpen] = useState(false)
const [passOpen, setPassOpen] = useState(false)
const [delOpen, setDelOpen] = useState(false)

const [theUpdating, setTheUpdating] = useState(false)
const [theUpdatingPass, setTheUpdatingPass] = useState(false)



const renderUpdate = () => (
<React.Fragment>
    <input type="text" className="a-inp" placeholder="Fullname" 
    value={updateInfo.fullname} onChange={e => setUpdateInfo({...updateInfo, fullname: e.target.value})} />

    <input type="text" className="a-inp" placeholder="Email" 
    value={updateInfo.email} onChange={e => setUpdateInfo({...updateInfo, email: e.target.value})} />
</React.Fragment>
)

const renderChangePass = () => (
<React.Fragment>
    <input type="password" className="a-inp" placeholder="Input Old Password" 
    value={cPassword.oldpass} onChange={e => setCpassword({...cPassword, oldpass: e.target.value})} />

    <input type="password" className="a-inp" placeholder="Input New Password" 
    value={cPassword.newpass} onChange={e => setCpassword({...cPassword, newpass: e.target.value})} />

    <input type="password" className="a-inp" placeholder="Confirm New Password" 
    value={cPassword.confirm} onChange={e => setCpassword({...cPassword, confirm: e.target.value})} />
</React.Fragment>
)

const saveUpdate = async () => {
if(!updateOpen){
setUpdateOpen(true)
}else{
setTheUpdating(true)
setUpdateOpen(false)
const {data} = await API.patch('/edituser', updateInfo)
if(data === 'email taken') {
setTheUpdating(false)
return alert('email already taken')
}
localStorage.setItem('profile', JSON.stringify(data))
setUser(JSON.parse(localStorage.getItem('profile')))
alert('We have successfully updated your info')
setUpdateInfo({
    fullname: '', email: ''
    })
setUpdateOpen(false)
setTheUpdating(false)
}
}


const savePasswordNew = async () => {
if(!passOpen){
setPassOpen(true)
}else{
setPassOpen(false)
setTheUpdatingPass(true)
if(cPassword.confirm !== cPassword.newpass){
setPassOpen(true)
setTheUpdatingPass(false)
return alert('Password do not match')
}

const {data} = await API.patch('/changepass', {
oldpass: cPassword.oldpass,
newpass: cPassword.newpass
})

if(data === 'invalid old pass'){
alert('Invalid Old Password')
setCpassword({newpass: '', oldpass: '', confirm: ''})
return setTheUpdatingPass(false)
}

localStorage.setItem('profile', JSON.stringify(data))
setUser(JSON.parse(localStorage.getItem('profile')))
setTheUpdatingPass(false)
alert('password has been saved')
setCpassword({
newpass: '', oldpass: '', confirm: ''
})
}
}

const confirmDelFunc = async () => {
await API.delete('/deleteuser')
history.push('/farewell')
localStorage.removeItem('profile')
setUser(JSON.parse(localStorage.getItem('profile')))
}

useEffect( () => {
console.log(deletedNa)
}, [deletedNa])

if(!user){
return <h2>You Must be Logged In</h2>
}

return (
<div className="accounts-page">
    <div className="a-midbx">
        <div className="a-top">
            <h2 className="a-ttle">Accounts Info</h2>
            <div className="a-infobx">
                <label className="a-label">Full Name</label>
                <h4 className="a-name">{user.result.fullname}</h4>
            </div>
            <div className="a-infobx">
                <label className="a-label">Your Email</label>
                <h4 className="a-name">{user.result.email}</h4>
            </div>
        </div>
        
        <div className="a-bot">
            <h2 className="a-ttle">Actions Needed</h2>

            <div className="a-infobx">
                <h4 className="a-name"style={{marginBottom: '5px'}}>Updating Info.</h4>
                <p className="a-para">You can always update your info here, 
                after pressing the update button complete the form that showned</p>
                {updateOpen && renderUpdate()}
                {theUpdating ? <CircularProgress /> : ''}
                <button onClick={saveUpdate}
                className="a-btn">{updateOpen ? 'Save' : 'Update'}</button>
            </div>

            <div className="a-infobx">
                <h4 className="a-name" style={{marginBottom: '5px'}}>Change Password</h4>
                <p className="a-para">Always protect your password</p>
                {passOpen && renderChangePass()}
                {theUpdatingPass ? <CircularProgress /> : ''}
                <button onClick={savePasswordNew}
                className="a-btn">{passOpen ? 'Save Password' : 'Password Change'}</button>
            </div>

            <div className="a-infobx">
               
                <button onClick={() => {
                    setDeletedNa(true)
                    setDelOpen(!delOpen)}
                } 
                 className="a-btn delacc">Delete Acc</button>
            </div>
        </div>
    </div>

<div className={delOpen ? "deletion-acc" : "hide-menu"}>
    <div className="del-cont">
    <h5 className="a-name">Are you sure you<br /> want to delete your account ?</h5>
    <button onClick={() => setDelOpen(!delOpen)} className="a-btn delacc">Cancel</button>
    <button onClick={confirmDelFunc}
    className="a-btn confirm-del">Confirm</button>
    </div>

</div>

</div>
)
}

export default Accounts
