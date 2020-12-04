import React, {useEffect, useState} from 'react';
import '../styles/signUp.css'
import {Link, useHistory} from 'react-router-dom'
import Axios from 'axios';
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdbreact';
import logo from '../images/logo3.png'
import Footer from './Footer';



export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('')
    const [emailSent, setEmailSent ] = useState(false);
    const formData = new FormData();
    const history = useHistory();

    
    
    const handleSubmit = (e)=>{
        
        console.log(profilePicture)
        e.preventDefault()
        
        fetch("/api/v1/user/resetpassword", {
            method: "POST",
            body: JSON.stringify({
                email: email
            }),
            headers:{
                Accept: "application/json",
                'Content-type': 'application/json'
            }
           
        })
        .then(res => res.json())
            
        .then(data =>{
            console.log(formData)
            if(data.error){
                alert(data.error)
                // setError(data.error)
            }else{
                console.log(data.message) 
                //email 
            }
            
        })
    }
    
    return (
        <div>
        <div id="left-side">
            <aside>
                <img src={logo} alt="logo" width="50%"/>
                <h2>Create an account and start publishing or searching projects today!</h2>

                <Link to="/" className="back-home">
                <MDBIcon icon="angle-double-left" size={30}  />
                </Link>
                
            </aside>

            <div id="right-side">
                <aside>
                    <form className="signup-form" onSubmit={handleSubmit}>

                <fieldset>
                    <legend className="signup-legend">Enter Your Email </legend>

                    <div className="input-block">
                        <label htmlFor="Email">
                             Email
                            </label>
                        <input
                            icon="lock"
                            id="email"
                            value={email}
                            onChange={(e)=> {setEmail(e.target.value)}}
                        />
                    </div>
                </fieldset>

                <button className="confirm-button" type="submit">
                    Submit  <MDBIcon far icon="paper-plane ml-1" />
                </button>
            </form>
            </aside>
            </div>
        </div>

        </div>
    )
}
