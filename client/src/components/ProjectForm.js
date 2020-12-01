import React, { useEffect, useState }  from 'react'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdbreact';
import '../styles/profileSetup.css'
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './Navbar';
import SkillSearchBar from './SkillSearchBar';
import Axios from 'axios';
import { clearSearchSkillArray } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer';

export default function ProjectForm() {
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedAt, setPublishedAt] = useState(new Date());
  const [deadline, setDeadline]  = useState(new Date());
  const [memberLimit, setMemberLimit] = useState(0);
  const dispatch = useDispatch();
  const pickedSkillsArray = useSelector(state => state.searchSkillsToAdd)

  useEffect(() => {
    dispatch(clearSearchSkillArray())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitle('');
    setDescription('');
    setMemberLimit(0);
    const projectSkillsArray = pickedSkillsArray.map(skill => skill.id)
    Axios.post(`/api/v1/projects/`,{
      title,
      description,
      publishedAt,
      deadline,
      memberLimit,
      projectSkillsArray
    })
      .then(res => {
        console.log(res)
        dispatch(clearSearchSkillArray());
      })
      .catch(e => {
        console.log(e)
      })
  }

    return (
        <>
        <Navbar />

        <div id="top">
            <MDBContainer>
            <MDBRow>
            <MDBCol md='3' className="mt-5">
        <MDBCard testimonial className="card-profile" >
          <div gradient='aqua' backgroundColor="red"/>
          <div className='mx-auto white'>
            <img
              src={user.loginInfo.profilePicture} 
              alt='' className="img-fluid rounded-circle hoverable border border-info" width="100%" 
            />
          </div>
          <MDBCardBody>
          <h4 className='card-title'> <MDBIcon icon="user indigo-text" /> {user.loginInfo.firstName} {user.loginInfo.lastName} </h4>
          <h4 className='card-title'> <MDBIcon icon="envelope orange-text" /> {user.loginInfo.email} </h4>
            <hr />
            
          {/* <p class="filled-profile">Filled profile (20%)</p> */}
         
            {/* <div >
            <MDBProgress value={20} className="my-2" />
            </div> */}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
   
      <MDBCol md="7" className=" container-form">
            <MDBCard className="card-complete-profile" testimonial>
          <div className="form-title">
          TELL US ABOUT YOUR PROJECT <MDBIcon icon="file-signature indigo-text" /> 
          </div>
          <div >
    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="defaultFormCardNameEx" className="labe-headline" ><MDBIcon icon="share indigo-text" /> Project Title
          </label>
          
      <MDBInput label="Project title" outline  value={title} onChange={(e) => {setTitle(e.target.value)}}/><br/>

      <label htmlFor="defaultFormCardNameEx" className="labe-headline"><MDBIcon icon="share indigo-text" /> Describe your project
          </label>
      <MDBInput htmlFor="exampleFormControlTextarea1" type="textarea" label="Brief description of your project" outline value={description} onChange={(e) => {setDescription(e.target.value)}}/><br/>

      <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> What technical skills are you looking for?</h1>
      <SkillSearchBar category='technical'/>
      <br />
      
      <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> What soft skills are you looking for?</h1>
      <SkillSearchBar category='soft'/>
      <br />
      
      <h1 className=" label-skillbar"> <MDBIcon icon="share indigo-text" /> Any language preference?</h1>
      <SkillSearchBar category='language'/><br/>


      <label htmlFor="defaultFormCardNameEx" className="labe-headline" ><MDBIcon icon="share indigo-text" /> How many people will be acceptable for this project?
          </label>
      <MDBInput label="Enter a number" outline  value={memberLimit} onChange={(e) => {setMemberLimit(e.target.value)}}/> <br/> 

      
      <label htmlFor="defaultFormCardNameEx" className="labe-headline"> <MDBIcon icon="share indigo-text" /> What is the deadline for this project?
          </label>
      <DatePicker classeName="date-picker" selected={deadline} onChange={date => setDeadline(date)} /> <br/> <br/>
      
      
      {/* <label htmlFor="defaultFormCardNameEx" className="labe-headline">
            When would you like to publish this project?
          </label>
      <DatePicker selected={publishedAt} onChange={date => setPublishedAt(date)} /><br/> <br/> */}

      <Button variant="success" type="submit" className="btn btn-lg btn-block mb-5">
        Publish Project <MDBIcon icon="file-upload" />
      </Button>
      </form>
      </div>
      </MDBCard>
    </MDBCol>
      </MDBRow>
            </MDBContainer>
        </div>

        <Footer />
      </>
    )
}
