import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const Sorry = ({deletedNa, setDeletedNa}) => {

const history = useHistory()
    
// useEffect( () => {

// if(!deletedNa){
//     history.push('/')
// }

// console.log(deletedNa)
// setDeletedNa(false)
    
// }, [])

// if(!deletedNa){
//     return <button onClick={() => console.log(deletedNa)}>show</button>
// }
if(deletedNa === true){
return (
    <div className="sorry-page">
        <div className="s-left">
            <h1 className="s-caption">We are very sorry that you<br />
             had a bad experience in this app.</h1>
            
        </div>
        <div className="s-right">
            <img src="./images/sad.svg" alt="beproductive" className="s-img" />
        </div>
    </div>
    )
}else{
    return <button onClick={() => console.log(deletedNa)}>show</button>
}

}

export default Sorry
