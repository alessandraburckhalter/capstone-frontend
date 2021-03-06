import React, {useEffect, useState} from 'react';
import '../styles/signUp.css'
import {Link, useHistory, useLocation, useParams} from 'react-router-dom'
import Axios from 'axios';
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdbreact';
import logo from '../images/logo3.png'
import Footer from './Footer';
import { useSelector } from 'react-redux';



export default function ResetPassword() {
    const user = useSelector(state => state.user)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [showPage, setShowPage] = useState(null)
    const history = useHistory();
    const location = useLocation();
    // const { userId, token } = 
    const query = new URLSearchParams(location.search)
    
    useEffect(() =>{
        //Get user.id and token from query param
        //Use token and id to send fetch request to server
        fetch(`/api/v1/user/confirmtoken`, {
            method: 'POST',
            body: JSON.stringify({
                //new api that takes user.id and token in params
                userId: query.get('userId'),
                token: query.get('token')
            }),
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            //if token valid then show form
            if(data.success){
                setShowPage(true)
            }else{
                //else display token is not valid
                setShowPage(false)
            }
        })
        




        //
    })
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        fetch("/api/v1/user/newpassword", {
            method: "PATCH",
            body: JSON.stringify({
                userId: query.get('userId'),
                token: query.get('token'),
                password: password
            }),
            headers:{
                Accept: "application/json",
                'Content-type': 'application/json'
            }
           
        })
        .then(res => res.json())
            
        .then(data =>{
            if(data.error){
                alert(data.error)
                // setError(data.error)
            }else{
                let path = "/"
                history.push(path)
            }
            
        })
    }
    if(showPage === null){
        return 'Loading!'
    }
    return (

        <div>
        <MDBRow className="no-gutters">
        <MDBCol md="5" className="no-gutters ">
        <div className="leftside d-flex justify-content-center align-items-center">
                <img src={logo} alt="logo" width="50%"/>
                <h2>Start publishing or searching projects today!</h2>

                <Link to="/" className="back-home">
                <MDBIcon icon="angle-double-left" size={30}  />
                </Link>
                </div>
            </MDBCol>

            <MDBCol md="7" className="no-gutters md-6">
                {showPage === true ?(
               <div className="rightside d-flex justify-content-center align-items-center"> 
                    <form className="signup-form" onSubmit={handleSubmit}>

                <fieldset>
                    <legend className="signup-legend">Enter New Password</legend>

                    <div className="input-block">
                        <label htmlFor="password">
                            Password
                            </label>
                        <input
                            icon="lock"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                            </label>
                        <input
                            icon="lock"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=> {setConfirmPassword(e.target.value)}}
                        />
                    </div>
                    
                </fieldset>

                <button className="confirm-button" type="submit">
                    Submit  <MDBIcon far icon="paper-plane ml-1" />
                </button>
            </form>
            </div>

                ):(

                    
                    <div className="justify-content-center align-items-center rightside-reset">
                    <h3>Your password reset token has expired 😕</h3>
                    <br></br>
                    <h3><Link to="/forgotpassword">Click here to request a new one.</Link></h3>
                    </div>
                    
                )}
            </MDBCol>
        </MDBRow>

        </div>
    )
}
