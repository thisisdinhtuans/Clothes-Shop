import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { useState } from 'react';


export default function Register() {
    const [validationErrors, setValidationErrors]=useState([]);
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}}=useForm( {
        mode:'onTouched'
    })

  return (
      <Container component={Paper} maxWidth="sm" 
        sx={{displat:'flex', flexDirection:'column', alignItems:'centers',p:4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data=>agent.Account.register(data)
            .catch(error=>setValidationErrors(error)))} 
            noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username',{required:'Username is required'})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register('email',{required:'Email is required'})}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password',{required:'Password is required'})}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            {validationErrors.length>0 && 
                <Alert severity='error'>
                    <AlertTitle>
                        Validation Errors
                    </AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>}
            <LoadingButton loading={isSubmitting}
            //chỉ khi điền đủ thì cái nút đăng nhập mới bấm được
                disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item>
                {/* Link ở đây là phải import react router dom */}
                <Link to='/login'>
                  {"All have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}