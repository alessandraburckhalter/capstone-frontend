import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userPic from '../../images/user.jpg'


export default function IndividualProject(props) {
    const { project } = props
    const user = useSelector(state => state.user)
    // !! makes it a boolean
    const isApplied = !!(project.Members.find(member => {
        return member.id === user.loginInfo.id
    }))
    const isAccepted = !!(user.loginInfo.MemberProjects.find(memProject => {
        return memProject.TeamMember.ProjectId === project.id && memProject.TeamMember.approved === "approved"
    }))
    const isDeclined = !!(user.loginInfo.MemberProjects.find(memProject => {
        return memProject.TeamMember.ProjectId === project.id && memProject.TeamMember.approved === "declined"
    }))
    const isOwner = project.User.id === user.loginInfo.id

    const [comment, setComment] = useState([])
    const [modal, setModal] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const cancelApply = () => {
        fetch(`/api/v1/projects/${project.id}/teamMember`, {
            method: 'DELETE',
            body: JSON.stringify({
                memberIdArray: user.loginInfo.id
            }),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                props.loadProject()
            })
    }
    const applyProject = (e) => {
        fetch(`/api/v1/projects/${project.id}/teamMember`, {
            method: 'POST',
            body: JSON.stringify({
                memberIdArray: user.loginInfo.id
            }),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                props.loadProject()
            })
    }
    useEffect(() => {
        fetch(`/api/v1/projects/${project.id}/comments`)
            .then(res => res.json())
            .then(data => {
                setComment(data)
            })
    }, [project.id])

    const toggle = () => {
        setModal(!modal);
    }

    const toggleDetail = () => {
        setModalDetail(!modalDetail);
    }

    return (
        <div>
            <div key={project.id}>
                <MDBRow>
                    <MDBCol className="individual-col">
                        <MDBCard className="card-body card-body-all-projects1 mb-5" >
                            <MDBCard className="card-body card-body-all-projects2">
                                <div className="d-block d-md-flex mt-4">
                                    <img className="card-img-64 d-flex  mb-3" src={userPic} alt="" />

                                    <div className="text-center text-md-left ml-md-3 ml-0 ">
                                        <h5 className="font-weight-bold mt-0 full-name-comments avatar-card">
                                            {project.User.firstName} {project.User.lastName} <br /> {project.User.title}
                                        </h5>
                                    </div>
                                </div>
                                <br />
                                <aside>
                                    <MDBCardTitle className="project-title"><Link className="project-tilte" to={isOwner ? `/dashboard/${project.id}` : `/projects`}><i className="fas fa-bookmark amber-text"></i>  {project.title} </Link></MDBCardTitle>
                                    <MDBCardText>
                                        {project.description.slice(0, 90)}{(project.description.length > 90 && "...")} <Link to="#" onClick={isOwner || isAccepted ? toggleDetail : toggle}>Read More</Link>
                                        <MDBModal isOpen={modal} toggle={toggle}>
                                            <MDBModalHeader toggle={toggle}>Privacy Measures</MDBModalHeader>
                                            <MDBModalBody>
                                                We respect our users privacy. The full description will only be available after the project owner accepts your application. We appreciate your understanding.
                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <button className='btn btn-primary' onClick={toggle}>Close</button>
                                            </MDBModalFooter>
                                        </MDBModal>

                                        <MDBModal isOpen={modalDetail} toggle={toggleDetail}>
                                            <MDBModalHeader toggle={toggleDetail}>Project Description</MDBModalHeader>
                                            <MDBModalBody>
                                                {project.description}
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <button className='btn btn-primary' onClick={toggleDetail}>Close</button>
                                            </MDBModalFooter>
                                        </MDBModal>
                                    </MDBCardText>
                                    <h3 className="all-prjects-skills-title"><i className="fas fa-angle-right"></i> Desirable Technical Skills</h3>
                                    <MDBCardText>
                                        {Object.keys(project).length > 0 && project.Skills.filter((userData) => {
                                            return (userData.category === "technical")
                                        }).length > 0 ? (project.Skills.filter((userData) => {
                                            return (userData.category === "technical")
                                        }).map((name, index) => {
                                            return <span className="skills-dashboard" key={index}>{name.name} </span>
                                        })) : "No required skill. "}<br /><br />
                                    </MDBCardText>
                                    <h3 className="all-prjects-skills-title"><i className="fas fa-angle-right"></i> Desirable Soft Skills</h3>
                                    <MDBCardText>
                                        {Object.keys(project).length > 0 && project.Skills.filter((userData) => {
                                            return (userData.category === "soft")
                                        }).length > 0 ? (project.Skills.filter((userData) => {
                                            return (userData.category === "soft")
                                        }).map((name, index) => {
                                            return <span className="skills-dashboard" key={index}>{name.name} </span>
                                        })) : "No required skill."}<br /><br />
                                    </MDBCardText>
                                    <h3 className="all-prjects-skills-title"><i className="fas fa-angle-right"></i> Acceptable Spoken languages</h3>
                                    <MDBCardText>
                                        {Object.keys(project).length > 0 && project.Skills.filter((userData) => {
                                            return (userData.category === "language")
                                        }).length > 0 ? (project.Skills.filter((userData) => {
                                            return (userData.category === "language")
                                        }).map((name, index) => {
                                            return <span className="skills-dashboard" key={index}>{name.name} </span>
                                        })) : "No required language."}
                                    </MDBCardText>
                                    <br />

                                    <div className="flex-row d-flex">
                                        <a href="#!" className="card-link icon icon-all-projects-width">
                                            {project.isCompleted === false ?
                                                (<><MDBIcon icon="lock-open green-text" /> Available</>) :
                                                (<><MDBIcon icon="lock black-text" /> Unavailable</>)} <span>Project Status</span>
                                        </a>
                                        <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text" /> {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)} <span>Deadline</span>
                                        </a>
                                        <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> {project.memberLimit} <span>Max. members</span>
                                        </a>
                                        <Link to={`/projects/${project.id}`} className="card-link icon icon-all-projects-width"><i className="fas fa-comment-dots"></i> {comment && comment.length} <span>Comments</span>
                                        </Link>
                                    </div>
                                    
                                        <div>
                                            {
                                                isOwner ?
                                                    <button className=" inactive-own">
                                                        You own this project
                                        </button>
                                                    :
                                                    isAccepted ?
                                                        <>
                                                            <button className="inactive-in" disabled>
                                                                You are in this project
                                            </button>

                                                        </>
                                                        :
                                                        isDeclined ?
                                                            <>
                                                                <button className="inactive-declined" disabled>
                                                                    You were declined for this project
                                        </button>

                                                            </>
                                                            :

                                                            isApplied ?
                                                                <>
                                                                    <button className="inactive-applied" disabled>
                                                                        You applied to this project
                                            </button>
                                                                    <button className='btn  cancel-application' onClick={cancelApply}>Cancel application</button>
                                                                </>
                                                                :
                                                                <button className=" participate-button" onClick={applyProject}>
                                                                    I want to be part of this project
                                            </button>

                                            }
                                        </div>
                                </aside>
                            </MDBCard>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>


        </div>
    )
}
