import {useState,useEffect, Fragment} from 'react'
import {Link,useParams} from 'react-router-dom'
import success from './avtar.jpg'
import axios from 'axios';
const EmailVerify=()=>{
    const [validUrl,setValidUrl]=useState(false);
    const param=useParam();
    useEffect(()=>{
        const verifyEmailUrl=async()=>{
            try{
                const url=`https://unitantra-backend.onrender.com/api/users/${params.id}/verify/${params.token}`
                const {data}=await axios.get(url);
                console.log(data);
                setValidUrl(true)
            }catch(error){


                console.log(error);
                setValidUrl(false)
            }
        }
        verifyEmailUrl();
    },[param])
    return(
<Fragment>
    {validUrl?(<><img src={success} alt="success">
    </img>
    <Link to="/login"></Link>
    <h1>Success</h1></>


    ):(
        <h1>404</h1>
    )}
</Fragment>
          
    )
}