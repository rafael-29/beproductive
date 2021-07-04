import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {TextField} from '@material-ui/core'

const DailyTasks = ({user}) => {

const [dailyTasks, setDailyTasks] = useState()
const [loadWhenCheck, setLoadWhenCheck] = useState(false)
const [addWindow, setAddWindow] = useState(false)

const [dtName, setDtName] = useState('')

const API = axios.create({
baseURL: 'https://beproductive-api.herokuapp.com/tasks'
})

API.interceptors.request.use( (req) => {

req.headers.authori = `bearer ${user.token}`

return req
})

const fetchDaily = async () => {
try {
  const results = await API.get('/')
  setDailyTasks(results.data)

} catch (error) {
    console.log(error)
}
}

const checkTheTask = async (e) => {
setLoadWhenCheck(!loadWhenCheck)
await API.patch(`/dailytask/${e._id}`)
await fetchDaily()
setLoadWhenCheck(false)
}

const delThisTask = async e => {
setLoadWhenCheck(!loadWhenCheck)
await API.delete(`/deletetask/${e._id}`)
await fetchDaily()
setLoadWhenCheck(false)
}

const deleteWholeDT = async e => {
setLoadWhenCheck(!loadWhenCheck)
await API.delete(`/deletedt/${e._id}`)
await fetchDaily()
setLoadWhenCheck(false)
}

const renderDailyTasks = () => {
 
    return dailyTasks.map(del => (
        <div key={del._id}>
            <h4 className="dt-realname">{del.name}</h4>
            <div className="small-dt-container">
            {del.dtask.map(task => (
            <div className="task-bx" key={task._id}>
                <i onClick={() => delThisTask(task)}
                className="dTrash fas fa-trash-alt"></i>
                <input type="checkbox" className={task.completed ? 'dt-checkbx checktrue' : 'dt-checkbx notchecked'} />
                <p className={task.completed ? "task-name-green" : "task-name"} onClick={() => checkTheTask(task)}
                >{task.taskname}</p>
            </div>
            ))}
            </div>
            <div className="addingtaskbx">
            <input id="inpaddtxt" onKeyPress={async e => {
            if(e.key === 'Enter'){
            setLoadWhenCheck(!loadWhenCheck)
            await API.post(`/add/${del._id}`, {taskname: e.target.value})
                
            await fetchDaily();
            e.target.value = ""
            setLoadWhenCheck(false)
            
            }
            }}
            type="text" className="insert-task" placeholder="Create New Task"/>
            <button onClick={ async e => {
                const inputValue = e.target.parentElement.children[0].value;
            
                setLoadWhenCheck(!loadWhenCheck)
                await API.post(`/add/${del._id}`, {taskname: inputValue})
                    
                await fetchDaily();
                e.target.parentElement.children[0].value = ""
                setLoadWhenCheck(false)
                
            }} className="addtask-btn"><i style={{pointerEvents: 'none'}} className="fas fa-plus"></i></button>
            </div>
            <p onClick={() => deleteWholeDT(del)}
            className="delete-dt-whole">Remove All
            <i className="dTrash-whole fas fa-trash-alt"></i>
            </p>
        </div>
    ))
}

const createNewDTask = async e => {
await API.post('/adddaily', { name: dtName})
fetchDaily()
setAddWindow(false)
setDtName('')
}

const renderEmpty = () => (
<div className="empty-book">
    <h2 className="eb-h">No Task As of Now</h2>
    <button onClick={() => setAddWindow(!addWindow)} 
    className="eb-btn">Make New</button>
    
</div>
)
const renderLoading = () => (
<div className="empty-book">
    <h2 className="eb-h">Page is loading...</h2>
</div>
)


useEffect( () => {
fetchDaily()
}, [])
return(
<div className="dailytask-page">

    <div className={loadWhenCheck ? 'load-check' : 'load-no'}>
        <h2 className="load-cap">Completing Request</h2>
    </div>
   
    <button onClick={() => setAddWindow(true)}
    className={dailyTasks === undefined ? 'hide-menu' : !dailyTasks.length ? "hide-menu" : "dt-create"}>Create New Daily Task <i className="dtbtn fas fa-plus-circle"></i>
    </button>

    <div className="dailytask-header">
      
    <div className="daily-container">
        {dailyTasks === undefined ? 
        renderLoading() : !dailyTasks.length ? renderEmpty() : renderDailyTasks()
        }
    </div>

       
     
    </div>

    <div className={addWindow ? "newtask-form-cont" : "hide-menu"}>
        <div className="newtask-form">
            <h4 className="dt-label">Create New</h4>
            <TextField onChange={(e) => setDtName(e.target.value)} value={dtName}
            size="small" label="Daily Task Name"
             color="secondary" variant="outlined" style={{
             marginBottom: '10px', border: ''
            }}
             fullWidth />
            <button onClick={createNewDTask}
            className="create-dt-now">CREATE</button>
            <button onClick={() => setAddWindow(false)}
            className="create-dt-cancel">CANCEL</button>
            <div className="close-dt-btn" onClick={() => setAddWindow(false)}>
            <i className="red-cancel fas fa-times-circle"></i>
            </div>
        </div>
    </div>
</div>
)
}
export default DailyTasks;