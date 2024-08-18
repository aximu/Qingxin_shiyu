"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularImage from './spinner';

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const { access_token } = data;
      
      // Assign Bearer token to the WWW-Authenticate header
      localStorage.setItem('token', `Bearer ${access_token}`);
      router.push("/");
      // Optionally, you may perform some action upon successful login
    } catch (error) {
      setError("Error, verify credentials!");
    } finally {
      setIsLoading(false)
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Stack spacing={5} m={{sx:10, md:10, sm:10}} direction="column">
      <CircularImage />
      <h1>Sign-in</h1>
      <FormControl variant="filled">
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput 
            fullWidth 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            type="text" 
            id="username"
          />
      </FormControl>
      
      <FormControl variant="filled">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
      </FormControl>
      <LoadingButton 
        variant="outlined" 
        color="info" 
        onClick={handleSubmit} 
        loading={isLoading} 
        loadingPosition="start" 
        startIcon={<LockOpenIcon />}
      >
        Login
      </LoadingButton>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Stack>
  );
};

export default LoginForm;

