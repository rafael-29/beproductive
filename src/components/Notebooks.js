import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {TextField} from '@material-ui/core'
import axios from 'axios'



const Notebooks = ({user, setUser}) => {

const history = useHistory()
const [allBooks, setAllBooks] = useState()
const [addWindow, setAddWindow] = useState(false)
const [loadWhenCheck, setLoadWhenCheck] = useState(false)


const [noteBookName, setNoteBookName] = useState('')

const API = axios.create({
    baseURL: 'https://beproductive-api.herokuapp.com/notes'
})
API.interceptors.request.use( (req) => {
req.headers.authori = `belat ${JSON.parse(localStorage.getItem('profile')).token}`

return req
})

const fetchUserNotes = async () => {
const { data } = await API.get('/usernotes')
setAllBooks(data)

}

const createNewBook = () => {
API.post('/addbook', {notebookname: noteBookName})
.then( results => {

console.log(results.data)
fetchUserNotes()
setAddWindow(false)
setNoteBookName('')
})
.catch(error => console.log(error))
}

const delThisBook = async e => {
const { data } = await API.delete(`/deltbook/${e._id}`)
console.log(data)
fetchUserNotes()
}

const BookInfo = book => {
history.push(`/bookpage/${book._id}`)
}

const renderAllBooks = () => {
return  allBooks.map(book => (
<div className="booksbx" key={book._id}>
    <i onClick={() => BookInfo(book)} class="thebook fas fa-book"></i>
    <h3 onClick={() => BookInfo(book)} className="book-name">{book.notebook}</h3>
    <i onClick={() => delThisBook(book)}
    class="delnote fas fa-times-circle"></i>
</div>
))
}


const renderEmpty = () => (
<div className="empty-book">
    <h2 className="eb-h">create a book to start</h2>
    <button onClick={() => setAddWindow(!addWindow)} 
    className="eb-btn">create</button>
</div>
)

const renderBackHome = () => {
    history.push('/')
}

useEffect( () => {
fetchUserNotes()
}, [])

if(!user){
  return  (
        <div className="notebook-page">
            <h2 className="load-cap">User Not Log In</h2>
            {renderBackHome()}
        </div>
    )
}

return(
<div className="notebook-page">

    <div className={loadWhenCheck ? 'load-check' : 'load-no'}>
        <h2 className="load-cap">Completing Request</h2>
    </div>
    
    <button onClick={() => setAddWindow(true)}
        className={allBooks === undefined ? "hide-menu" : !allBooks.length ? "hide-menu" : "dt-create"}>Create New Book <i className="dtbtn fas fa-plus-circle"></i>
    </button>
    
    <div className="notebook-inside-page">
    {allBooks === undefined ? <h3 className="load-undef">Loading ...</h3> : !allBooks.length ? renderEmpty() : renderAllBooks()}
    </div>

    <div className={addWindow ? "newtask-form-cont" : "hide-menu"}>
        <div className="newtask-form">
            <h4 className="dt-label">Create Book</h4>
            <TextField onChange={(e) => setNoteBookName(e.target.value)} value={noteBookName}
            size="small" label="Your Book Name"
             color="secondary" variant="outlined" style={{
             marginBottom: '10px', border: ''
            }}
             fullWidth />
            <button onClick={createNewBook}
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
export default Notebooks;