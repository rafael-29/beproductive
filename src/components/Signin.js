import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import axios from 'axios'




const Signin = ({user, setUser}) => {
const history = useHistory()
const normAPI = axios.create({
baseURL: 'http://localhost:8080'
})

const [sign, setSign] = useState(true)
const [formData, setFormData] = useState({
fullname: '', email: '', password: '', confirm: ''
})

const signinChange = e => {
const {name, value} = e.target;

setFormData({...formData, [name]: value})
}

const signInData = async () => {
const toAuth = {
    email: formData.email,
    password: formData.password
}
const { data } = await normAPI.post('/users/auth', toAuth)
if(data === 'invalid password' || data === 'email is not valid') return console.log('error ang auth password')
localStorage.setItem('profile', JSON.stringify(data))
setUser(JSON.parse(localStorage.getItem('profile')))
history.push('/')
}


const regData = () => {
const toRegister = {
    fullname: formData.fullname,
    email: formData.email,
    password: formData.password
}
if(formData.confirm !== formData.password){
    return alert('Password Dont Match')
}

normAPI.post('/users/register', toRegister)
.then( (results) => {
localStorage.setItem('profile', JSON.stringify(results.data))
setUser(JSON.parse(localStorage.getItem('profile')))
history.push('/')
})
.catch(err => console.log(err))

}

const regForm = () => (
<React.Fragment>

<h3 className="register-ttle">Register</h3>

<TextField name="fullname" style={{marginBottom: '5px'}} value={formData.fullname} onChange={signinChange}
    size="small" label="Enter Full Name" variant="outlined" fullWidth />

<TextField name="email" style={{marginBottom: '5px'}} value={formData.email} onChange={signinChange}
    size="small" label="Enter Email" variant="outlined" fullWidth />

<TextField name="password" type="password" style={{marginBottom: '5px'}} value={formData.password} onChange={signinChange}
    size="small" label="Enter Password" variant="outlined" fullWidth />

<TextField name="confirm" type="password" style={{marginBottom: '15px'}} value={formData.confirm} onChange={signinChange}
    size="small" label="Confirm Password" variant="outlined" fullWidth />

<Button onClick={regData}
variant="contained" style={{background: '#3e3636', color: '#fee9d7'}}>Register</Button><br />

<Button onClick={() => setSign(!sign)}
style={{float: 'right'}}>Already have an account ?</Button>

</React.Fragment>
)

const signForm = () => (
<React.Fragment>

<h3 className="register-ttle">Sign in</h3>

<TextField name="email" style={{marginBottom: '5px'}} value={formData.email} onChange={signinChange}
    size="small" label="Enter Email" variant="outlined" fullWidth />

<TextField type="password" name="password" style={{marginBottom: '20px'}} value={formData.password} onChange={signinChange}
    size="small" label="Enter Password" variant="outlined" fullWidth />

<Button onClick={signInData}
variant="contained" style={{background: '#3e3636', color: '#fee9d7'}}>Log in</Button><br />

<Button onClick={() => setSign(!sign)}
style={{float: 'right'}}>Don't Have an Account ? Register.</Button>

</React.Fragment>
)

if(user){
    return (
        <h3>Try Logging out before registering new account</h3>
    )
}

return (
<React.Fragment>

<div className="signin-page">
    <div className="singin-form">
        {sign ? signForm() : regForm()}
    </div>
    <p className="be">be</p>
</div>
</React.Fragment>
)
}

export default Signin;
