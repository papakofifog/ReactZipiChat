import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SendData } from '../../utility/handleAxiousRequest';
import {showToast} from '../../utility/showToast';
import { useState, useEffect } from 'react';
import { mutateZipiUserData } from '../../hooks/mutateZipiUserData';
import CircularStatic from '../utility_components/circulatProgress';
import CustomButton from '../utility_components/buttons';
import { DateRangeOutlined, EmailOutlined, Password, PasswordOutlined, PersonOffOutlined, PersonPin } from '@mui/icons-material';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignUp() {


  const [formData, setFormData]= React.useState({
    firstname:"",
    lastname: "",
    email:"",
    password: "",
    confirmPassword:"",
    username: "",
    Dob: ""

  })

  const [issubmitting, setSubmission] = useState(false);


  function handleChange(event){
    let {name,value}= event.target;
    setFormData((prevFormData)=>{
      return {...prevFormData, [name]:value}
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmission(true)
  };

  const sendSignUpRequest= async (data)=>{
      return await SendData("/api/signUp",data);
  }

  function handleSuccess(data){
    showToast(data.data.message,"green", true)
    setTimeout(()=>{location.href='/'},4000)
  }

  function handleError(error){
    console.error(error);
    showToast(error.data.message,"red", false)
    setSubmission((prevValue)=> !prevValue);
  }

  const {mutate, isLoading} = mutateZipiUserData("SignUp", sendSignUpRequest, handleSuccess, handleError);

  async function PostData() {
    mutate({
      firstname:formData.firstname,
      lastname: formData.lastname,
      email:formData.email,
      password: formData.password,
      username: formData.username,
      Dob: formData.Dob
    });
  }

  

  useEffect(() => {
    if(issubmitting){
        PostData();
      }
    }
    , [issubmitting]);

  
  
  return (
          <form className='formContainer' onSubmit={handleSubmit}>
          
              <div className='formInput'>
                <label htmlFor="firsname">First Name</label>
                <span>
                  <PersonPin className='authIcons' />
                  <input
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                    value={formData.firstname}
                  />
                </span>
                

              </div>
              <div  className='formInput'>
                <label htmlFor="lastname">Last Name</label>
                <span>
                  <PersonPin className='authIcons' />
                  <input
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={handleChange}
                    value={formData.lastname}
                  />
                </span>
                
              </div>
              <div className='formInput'>
                <label htmlFor="email">Email</label>
                <span>
                  <EmailOutlined className='authIcons' />
                  <input
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                </span>
                
              </div>
              <div className='formInput'>
                <label htmlFor="password">Password</label>
                <span>
                  <PasswordOutlined  className='authIcons'/>
                  <input
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="confirm-password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </span>
              </div>
              <div className='formInput'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <span>
                  <PasswordOutlined className='authIcons'/>
                  <input
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                </span>
                
              </div>
              <div className='formInput'>
                <label htmlFor="username">Username</label>
                <span>
                  <PersonPin className='authIcons' />
                  <input
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    autoComplete="username"
                    onChange={handleChange}
                    value={formData.username}
                  />
                </span>
                
              </div>
              <div className='formInput'>
                <label htmlFor="Dob">Date of birth</label>
                <span>
                  <DateRangeOutlined className='authIcons' />
                  <input
                    required
                    fullWidth
                    name="Dob"
                    label="Date Of Birth"
                    type="date"
                    id="Dob"
                    autoComplete="DOB"
                    onChange={handleChange}
                    value={formData.Dob}
                  />
                </span>
                
              </div>
            
            <CustomButton
              style="button"
              buttonName={isLoading?<CircularStatic /> : "Sign Up"}
              click={()=>{
                setSubmitStatus(true);
              }}
              isdisabled={isLoading}
            />
          </form>
       
      
    
  );
}