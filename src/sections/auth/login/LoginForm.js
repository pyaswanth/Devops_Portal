import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiAlert from '@mui/material/Alert';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}





export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [showErrorMessage, setshowErrorMessage] = useState(false);

  function ErrorMessage(){
    if(showErrorMessage===true){
      return <Alert severity="error">You have entered incorrect username or password</Alert>
    }
    
  }


  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      }).then((response)=>{
        const { success, message, LogedInUser } = response.data;
        console.log(LogedInUser)
        if (success) {
          // Do something with the user data, such as storing it in a state or redirecting to another page
          navigate('/dashboard/app', { replace: true }, {state:LogedInUser});
          console.log('Logged in user:', LogedInUser.username);
        } else {
          setshowErrorMessage(true)
          console.log('Not a valid user');
        }
      })
    } catch (error) {
      console.log('An error occurred during login.',error);
    }
  };


  return (
    <>
      <Stack spacing={3}>
        {
          <ErrorMessage/>
        }
        <TextField
         name="username" 
         label="User Name"
         value={username}
         onChange={(e) => setUsername(e.target.value)} 
         
         />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      
    </>
  );
}
