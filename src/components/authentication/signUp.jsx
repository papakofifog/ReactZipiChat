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

  const [receivedData, setRecievedData] = useState(null)

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

  async function PostData() {
    const response = await SendData('http://localhost:3000/api/signUp', {
      firstname:formData.firstname,
      lastname: formData.lastname,
      email:formData.email,
      password: formData.password,
      username: formData.username,
      Dob: formData.Dob
    } );
    const json = response;
    
    setRecievedData(json.data);

    if(receivedData.success){
      showToast(receivedData.message,"green", true)
      setTimeout(()=>{location.href='/'},4000)
    }else{
      showToast(receivedData.message,"red", false)
      setSubmission((prevValue)=> !prevValue);
    }
  }

  

  useEffect(() => {
    if(issubmitting){
        PostData();
      }
    }
    , [issubmitting,receivedData]);

  
  
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={formData.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12} >
                <TextField
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
              </Grid>
              <Grid item xs={12} >
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={"/"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}