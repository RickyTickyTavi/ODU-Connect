import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from "./context.js";
import Popup from 'reactjs-popup';
import emailjs from 'emailjs-com';

const API = "https:////411yellows20.cs.odu.edu/getuser/";
const APIKeywords = "https://411yellows20.cs.odu.edu/getuserkeywords/";
const ID = "user_z0UCXkTMEu9IzpAMTj9bl";

function EditProfile() {
    const { userHasAuthenticated } = useAppContext();
    const [hasError, setError] = useState(false);
    const [userName, setUserName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userOrg, setUserOrg] = useState(null);
    const [user, setUser] = useState([]);
    const [title, setTitle] = useState(null);
    const [organization, setOrg] = useState(null);
    const [email, setEmail] = useState(null);
    const [homePhone, setHomePhone] = useState(null);
    const [officePhone, setOfficePhone] = useState(null);
    const [mobilePhone, setMobilePhone] = useState(null);
    const [contactMethod, setContactMethod] = useState(null);
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [keywords, setKeywords] = useState("");
    const [submitted, setSubmit] = useState(false);
    const [userKeywords, setUserKeywords] = useState([]);
    const [comboAddress, setComboAddress] = useState(null);

    // handleChange = e => {
    //     const {name, value} = e.target;
    //     this.setState(() => ({
    //         [name]: value
    //     }))
    // }



    const handleSubmit = e => {
        e.preventDefault();
        //const {user, title, organization, email, address1, address2, city, state, zipcode, keywords} = this.state;
        //let userCopy = user

        setSubmit(true);
        // populateValues();

        console.log(user);
        console.log(title, organization);

        // setComboAddress(address1 + address2);
        console.log(address1);
        console.log(address2);
        //console.log(comboAddress);

        // '/updateuserphones/<string:id>/<string:title>/<string:org>/<string:email>/<string:addr>/<string:city>/<string:state>/<string:zip>/<string:hphone>/<string:wphone>/<string:cphone>/<string:pref>'
        axios.post('https://411yellows20.cs.odu.edu/updateuserphones/' + localStorage.getItem('localuser') + '/'
            + title + '/' + organization + '/'
            + email + '/' + address1 + '/' + address2 + '/' + city + '/'
            + state + '/' + zipcode + '/' + homePhone + '/'
            + officePhone + '/' + mobilePhone + '/' + contactMethod);
        //https://411yellows20.cs.odu.edu/putuserkeywords/44/Java
        axios.post('https://411yellows20.cs.odu.edu/putuserkeywords/' + localStorage.getItem('localuser') + '/'
            + keywords);

        console.log(user.UserFirstName);
        console.log(user.UserLastName);

       if(keywords){ emailjs.sendForm('smtp_server', 'keyword_template', e.target, ID).then(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
        }
    }


    async function fetchData() {
        userHasAuthenticated(true);
        const res = await fetch(API + localStorage.getItem('localuser'));

        res
            .json()
            .then(res => setUser(res.results))
            .catch(err => setError(err))
    }

    async function fetchKeywords() {
        const res2 = await fetch(APIKeywords + localStorage.getItem('localuser'));

        res2
            .json()
            .then(res2 => setUserKeywords(res2.results))
            .catch(err2 => setError(err2))
    }

    useEffect(() => {
        fetchData();
        fetchKeywords();
    }, []);

    function processContactMethod(userCM) {
        if (userCM === "M") {
            return "Mobile Phone";
        } else if (userCM === "H") {
            return "Home Phone";
        } else if (userCM === "O") {
            return "Office Phone";
        } else {
            return "Email";
        }
    }

    return (
        <div>
            <h1> Edit User Profile </h1>
            <div className="Contact">
                {user.map(user =>
                    <form id="contact-form" onSubmit={handleSubmit} className="form-editContainer">
                        <div><input type="hidden" name="contact_name" value={user.UserName} onChange={e => setUserName(e.target.value)}/></div>
                        <div><input type="hidden" name="contact_org" value={user.Organization} onChange={e => setUserOrg(e.target.value)}/></div>
                        <div className="form-profile">
                            <label htmlFor="name">Title: {user.Title}</label>
                            <input type="text" className="form-control" name="title" value={title} onChange={e => setTitle(e.target.value)} />

                        </div>
                        <div className="form-profile">
                            <label htmlFor="name">Organization: {user.Organization}</label>
                            <select value={organization} name="organization" className="form-control" onChange={e => setOrg(e.target.value)}>
                                <option value="select">Select Organization...</option>
                                <option value="Roc Solid Foundation">Roc Solid Foundation</option>
                                <option value="Old Dominion University">Old Dominion University</option>
                                <option value="American Civil Liberties Union">American Civil Liberties Union</option>
                                <option value="American Jewish World Service">American Jewish World Service</option>
                                <option value="Center for Constitutional Rights">Center for Constitutional Rights</option>
                                <option value="Human Rights Watch">Human Rights Watch</option>
                                <option value="L3Harris">L3Harris</option>
                                <option value="FTI">FTI</option>
                                <option value="Mitre">Mitre</option>
                                <option value="Alion">Alion</option>
                                <option value="Alion">Alion</option>
                                <option value="Anthem">Anthem</option>
                                <option value="IBM">IBM</option>
                                <option value="Amplified IT">Amplified IT</option>
                            </select>

                        </div>
                        <div className="form-profile">
                            <label htmlFor="exampleInputEmail1">Email: {user.UserEmailAddress}</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" name="email" value={email} onChange={e => setEmail(e.target.value)} />

                        </div>
                        <br />
                        <br />
                        <div className="form-profile">
                            <label htmlFor="exampleInputEmail1">Office Phone: {user.UserOfficePhone}</label>
                            <input type="text" className="form-control" name="officePhone" value={officePhone} onChange={e => setOfficePhone(e.target.value)} />

                        </div>
                        <div className="form-profile">
                            <label htmlFor="exampleInputEmail1">Mobile Phone: {user.UserMobilePhone}</label>
                            <input type="text" className="form-control" name="mobilePhone" value={mobilePhone} onChange={e => setMobilePhone(e.target.value)} />

                        </div>
                        <div className="form-profile">
                            <label htmlFor="exampleInputEmail1">Home Phone: {user.UserHomePhone}</label>
                            <input type="text" className="form-control" name="homePhone" value={homePhone} onChange={e => setHomePhone(e.target.value)} />

                        </div>
                        <div className="form-profile">
                            <label htmlFor="exampleInputEmail1">Contact Method: {processContactMethod(user.DefaultContactMethod)}</label>
                            <select value={contactMethod} name="contactMethod" className="form-control" onChange={e => setContactMethod(e.target.value)}>
                                <option value="select">Select Contact Method...</option>
                                <option value="O">Office Phone</option>
                                <option value="H">Home Phone</option>
                                <option value="M">Mobile Phone</option>
                                <option value="E">Email</option>
                            </select>

                        </div>
                        <br />
                        <br />
                        <div className="form-address">
                            <label htmlFor="name">Address: {user.UserAddressLine1} {user.UserAddressLine2}, {user.UserCity}, {user.UserState} {user.UserzipCode}</label>
                        </div>
                        <div className="form-profile">
                            <label htmlFor="name">Address Line 1:</label>
                            <input type="text" className="form-control" name="address1" value={address1} onChange={e => setAddress1(e.target.value)} />

                        </div>
                        <div className="form-profile">
                            <label htmlFor="name">Address Line 2:</label>
                            <input type="text" className="form-control" name="address2" value={address2} onChange={e => setAddress2(e.target.value)} />
                        </div>
                        <div className="form-profile">
                            <label htmlFor="name">City:</label>
                            <input type="text" className="form-control" name="city" value={city} onChange={e => setCity(e.target.value)} />

                        </div>
                        <div className="form-short">
                            <label htmlFor="name">State:</label>
                            <input type="text" className="form-control" name="state" value={state} onChange={e => setState(e.target.value)} />

                        </div>
                        <div className="form-short">
                            <label htmlFor="name">Zip Code:</label>
                            <input type="number" className="form-control" name="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />

                        </div>
                        <div className="form-keywords">
                            <label htmlFor="name">Keywords:
                    {userKeywords.map(keywords =>
                                <div class="keyword">
                                    {keywords.Keyword}
                                </div>
                            )} </label>
                            <input type="text" className="form-control" name="keywords" value={keywords || ''} onChange={e => setKeywords(e.target.value)} />
                        </div>
                        <br />

                        <div>
                            <Popup modal trigger={
                                <div className="button-div">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>}>

                                {close => (

                                    <div className='Mymodal'>
                                        <a className='close' onClick={close} >
                                            &times;
              </a>

                                        <div className="header">Success!</div>
                                        <div className="profile">
                                            You have successfully submitted your profile information. <br />
                                            <div className="button-div">
                                                <Link to="/profile">
                                                    <button className="btn btn-primary" padding="5px">View Profile</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>)}
                            </Popup>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}


export default EditProfile;