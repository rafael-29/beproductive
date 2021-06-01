import React, {useState, useEffect} from 'react'
import {TextField} from '@material-ui/core'
import axios from 'axios'



const BookPage = ({theprops}) => {

const API = axios.create({
baseURL: 'https://beproductive-api.herokuapp.com/notes'
})
API.interceptors.request.use( (req) => {

req.headers.authori = `belat ${JSON.parse(localStorage.getItem('profile')).token}`

return req
})


const BookId = theprops.match.params.id
const [allContent, setAllContent] = useState()
const [bookTitle, setBookTitle] = useState()
const [textData, setTextData] = useState({
title: '', content: ''
})

const [addWindow, setAddWindow] = useState(false)

const fetchBook = async () => {
const {data} = await API.get(`/bookinfo/${BookId}`)
setBookTitle(data.notebook)
setAllContent(data.content)
}


const renderEmpty = () => (
<div className="empty-book">
    <h2 className="eb-h">Nothing inside the book</h2>
    <button onClick={() => setAddWindow(!addWindow)} 
    className="eb-btn">Make New</button>
</div>
)
const renderLoading = () => (
<div className="empty-book">
    <h2 className="eb-h">Page is loading...</h2>
</div>
)

const addContentHere = async () => {
const { data } = await API.post(`/addtext/${BookId}`, textData)
console.log(data)
await fetchBook()
setTextData({
title: '', content: ''
})
setAddWindow(false)
}

const renderNotes = () => {
    return (
        <React.Fragment>
        <div className="thenotes-container">
            {allContent.map(cont => (
            <div className="notebx" key={cont._id}>
                <h3 className="note-ttle">{cont.title}</h3>
                <p className="note-p">{cont.content}</p>
            </div>
            ))}
        
        </div>
        <button onClick={() => setAddWindow(!addWindow)}
        className="addnew-txt">Create New <i className="bp-plus fas fa-plus-circle"></i></button>
        </React.Fragment>
    )
}

useEffect( () => {
    fetchBook()
}, [])
return (
<div className="bookcontent-page">
    
    <h2 className="bp-title">{bookTitle}</h2>

    {allContent === undefined ? renderLoading() : !allContent.length ? renderEmpty() : renderNotes()}
    
    <div className={addWindow ? "newtask-form-cont" : "hide-menu"}>
        <div className="newtask-form">
            <h4 className="dt-label">Create Text</h4>
            <TextField onChange={(e) => setTextData({...textData, title: e.target.value})} value={textData.title}
            size="small" label="Text Header (optional)"
             color="secondary" variant="outlined" style={{
             marginBottom: '10px', border: ''
            }}
             fullWidth />
            <div className="inp-bp-cnt" style={{marginBottom: '5px'}}>
                <textarea className="bp-txtfield" placeholder="Type content here"
                value={textData.content} onChange={e => setTextData({...textData, content: e.target.value})} />
            </div>
            <button onClick={addContentHere}
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

export default BookPage
