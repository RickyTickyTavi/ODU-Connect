import React, { Component, useState, useEffect } from 'react';import emailjs from 'emailjs-com';
import Popup from 'reactjs-popup';
import './App.css';

const ID = "user_z0UCXkTMEu9IzpAMTj9bl"
const API = "https:////411yellows20.cs.odu.edu/getuser/";

function Contact() {

    const [hasError, setError] = useState(false);
    const [user, setUser] = useState([]);

    async function fetchData(username, password) {
        const res = await fetch(API + localStorage.getItem('localuser'));
    
        res
          .json()
          .then(res => setUser(res.results))
          .catch(err => setError(err))
      }

    useEffect(() => {
        fetchData();
      }, []);

    function handleSubmit(e) {
        e.preventDefault();
        emailjs.sendForm('smtp_server', 'template_8OGwocOL', e.target, ID)

            .then(res => {
                console.log(res)
            })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    return (
        <div>
            <br></br><h2> Contact us! </h2><br></br>
            <h6>We are here to help and answer any questions you might have. We look forward to hearing from you!</h6>
            <div className="Contact">
                <form id="contact-form" onSubmit={handleSubmit}>
                <div><input type="hidden" name="contact_name" />
                <label style={{color: '#FFF'}}>{user.UserFirstName} {user.UserLastName}</label></div>
                <div><input type="hidden" name="contact_org" />
                <label style={{color: '#FFF'}}>{user.Organization}</label></div>
                    <div className="form-group">
                        <label htmlFor="name">Recipient's Name</label>
                        <input type="text" className="form-control" name="user_name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Your Email address</label>
                        <input type="email" className="form-control" name="user_email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" name="message" />
                    </div>
                    <Popup modal trigger={
                        <button type="submit" value="Send" className="btn btn-primary">Submit</button>}>
                        {close => (

                            <div className='Mymodal'>
                                <a className='close' onClick={close} >
                                    &times;
                              </a>

                                <div className="header">Success!</div>
                                <div className="content">
                                    <p>You have successfully sent an email</p>

                                </div>
                            </div>)}
                    </Popup>
                </form>
            </div>
        </div>
    );
}



export default Contact;
