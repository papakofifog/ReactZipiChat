import * as React from 'react';
import { SendData } from '../../utility/handleAxiousRequest';
import {showToast} from '../../utility/showToast';
import { useState, useEffect } from 'react';
import { mutateZipiUserData } from '../../hooks/mutateZipiUserData';
import CircularStatic from '../utility_components/circulatProgress';
import CustomButton from '../utility_components/buttons';
import { DateRangeOutlined, EmailOutlined, Password, PasswordOutlined, PersonOffOutlined, PersonPin } from '@mui/icons-material';
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../utility/schemas';
import { colomn, row } from '../../utility/styles';


export default function SignUp() {


  const registerUser= {
    firstname:"",
    lastname: "",
    email:"",
    password: "",
    confirmPassword:"",
    username: "",
    Dob: ""

  }

  
  const {register, handleSubmit, control, formState}= useForm({defaultValues:registerUser, resolver:zodResolver(signUpSchema)});
  const {errors} = formState;



  const handleSendRequest = (formValues) => {
    mutate({
      ...formValues
    });
  };

  async function sendSignUpRequest(data){
      return await SendData("/api/signUp",data);
  }

  function handleSuccess(data){
    showToast(data.data.message,"green", true)
    setTimeout(()=>{location.href='/'},4000)
  }

  function handleError(error){
    showToast(error.data.message,"red", false)
  }

  const {mutate, isLoading} = mutateZipiUserData("SignUp", sendSignUpRequest, handleSuccess, handleError);
  return (
    <form className='formContainer' onSubmit={handleSubmit(handleSendRequest)}>
          
              <div className='formInput'>
                <label htmlFor="firstname">First Name</label>
                <div style={colomn}>
                  <span style={row}>
                    <PersonPin className='authIcons' />
                    <input
                      name="firstname"
                      {...register("firstname")}
                    />
                  </span>
                  <div style={{color:"red"} }>{errors.firstname?.message}</div>
                </div>
              </div>
              <div  className='formInput'>
                <label htmlFor="lastname">Last Name</label>
                <div style={colomn}>
                  <span style={row}>
                    <PersonPin className='authIcons' />
                    <input
                      id="lastname"
                      name="lastname"
                      {...register("lastname")}
                    />
                  </span>
                  <div style={{color:"red"} }>{errors.lastname?.message}</div>
                </div>
              </div>
              <div className='formInput'>
                <label htmlFor="email">Email</label>
                <div style={colomn}>
                  <span style={row}>
                    <EmailOutlined className='authIcons' />
                    <input
                    id='email'
                    name="email"
                    {...register("email")}
                  />
                  </span>
                  <div style={{color:"red"} }>{errors.email?.message}</div>
                </div>
              </div>
              <div className='formInput'>
                <label htmlFor="password">Password</label>
                <div style={colomn}>
                  <span style={row}>
                    <PasswordOutlined  className='authIcons'/>
                    <input
                      name="password"
                      type="password"
                      {...register("password")}
                    />
                  </span>
                  <div style={{color:"red"} }>{errors.password?.message}</div>
                </div>
              </div>
              {/*<div className='formInput'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div style={colomn}>
                  <span style={row}>
                    <PasswordOutlined className='authIcons'/>
                    <input
                      name="confirmPassword"
                      type="password"
                      {...register("password","confirmPassword")}
                    />
                  </span>
                  <div style={{color:"red"} }>{errors.confirmPassword?.message}</div>
                </div>
  </div>*/}
              <div className='formInput'>
                <label htmlFor="username">Username</label>
                <div style={colomn}>
                  <span style={row}>
                    <PersonPin className='authIcons' />
                    <input
                      name="username"
                      type="text"
                      {...register("username")}
                    />
                  </span>
                  <div style={{color:"red"} }>{errors.username?.message}</div>
                </div>
              </div>
              <div className='formInput'>
                <label htmlFor="Dob">Date of birth</label>
                <div style={colomn}>
                  <span style={row}>
                    <DateRangeOutlined className='authIcons' />
                    <input
                      name="Dob"
                      type='date'
                      {...register("Dob")}
                    />
                  </span>
                  <div style={{color:"red"} }>{errors.Dob?.message}</div>
                </div>
              </div>
              <input
              className="button"
              name={isLoading?<CircularStatic /> : "Sign Up"}
              type='submit'
              />
    </form>
               
    
  );
}