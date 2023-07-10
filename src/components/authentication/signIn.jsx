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
import { SendData ,sendAndVerifyUserDataLocaly} from '../../utility/handleAxiousRequest';
import {showToast} from '../../utility/showToast';
import { useState, useEffect } from 'react';
let hiddenVaraibles= import.meta.env.BASEURL;
import {  connectToSocket } from '../../socket';


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

export default function SignIn() {

  const [formdata,setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [issubmitting, setSubmission] = useState(false);

  const [isdisabled, setisdisabled] = useState(true);

  const [receivedData, setRecievedData] = useState(null)



  function handleChange(event){
    let {name, value}= event.target;
    setFormData((prevFormData)=>{
      return name==="rememberMe"?  {...prevFormData, [name]: !prevFormData.rememberMe} : {...prevFormData, [name]: value};
    })
    validateInput("email", formdata.email );
    validateInput("password",formdata.password)
  }

  function resetForm(){
    setFormData({
      email: "",
      password: "",
      rememberMe: false
    });
  }

  

    const handleSubmit = (event) => {
      event.preventDefault();
      setSubmission((prevValue)=> !prevValue)
    };

    async function PostData() {
      const response = await SendData('http://localhost:3000/api/login', {email: formdata.email, password:formdata.password} );
      const json = response;
      
      setRecievedData(()=>json.data);

      //setRecievedData(json);

      if(response.data.success){
        showToast(response.data.message,"green", true)
        window.sessionStorage.setItem('access-token', response.data.token)
        
        setTimeout(()=>{location.href='/home'},4000)
        
      }else{
        showToast(response.data.message,"red", false);
        
        setSubmission((prevValue)=> !prevValue);

        resetForm();
        
      }
    }

    function inputNotEmpty(inputState){
      return inputState.trim().length===0?false:true;
    }

    function getRegexPerInput(input){
      switch(input){
        case "email":
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          
        case "password":
          return /\W*/;
      }
    }

    function validateInput(inputType,inputState){
      let inputRegex=getRegexPerInput(inputType);
      let emptyInputStatus=inputNotEmpty(inputState);
      if(inputRegex.test(inputState) && emptyInputStatus){
        setisdisabled(false);
      }else{
        setisdisabled(true);
      }
    }

    useEffect(() => {
      if(issubmitting){
          PostData();
        }
      }
      , [issubmitting] );

      

      
  

  

  

  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={formdata.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={formdata.password}
            />
            <FormControlLabel
              control={<Checkbox name="rememberMe" value={formdata.rememberMe} onChange={handleChange} color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isdisabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={'/signUp'} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}