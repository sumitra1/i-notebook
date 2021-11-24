import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Signup(props) {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
      const  {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Succesfuly Signed in","success");

        
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="mt-3">
        <h2 classNam="my-2">Create an account to use iNotebook</h2> 
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="emailHelp" />
                   
                </div>
                <div className="mb-3">
                    
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword"  className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
