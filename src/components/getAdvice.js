import React, {useState, useEffect} from 'react'
import {CircularProgress, Typography, Grid, Button, Container} from '@material-ui/core'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

import {ranQ} from '../thirdApis/randomquotes.js' 

const GetAdvice = ({user}) => {
const history = useHistory();
const [advice, setAdvice] = useState('')

const fetchAdvice = () => {
axios.get(ranQ)
.then(response => setAdvice(response.data.slip.advice))
.catch(error => alert(error))
}

const renderAd = () => (
<React.Fragment>
<Typography variant="h5" style={{marginBottom: '20px'}}>
{advice}
</Typography>
<Button variant="outlined" style={{float: 'right', marginRight: '20px'}} onClick={fetchAdvice}>Get Advice</Button>
</React.Fragment>
)

useEffect( () => {
    fetchAdvice();
}, [])

if(!user){
  return history.push('/')
}

return(
<Container maxWidth="sm" style={{
marginTop: '140px'
}}>
  
{advice === '' ? <CircularProgress /> : renderAd()}

</Container>
)
}
export default GetAdvice;
