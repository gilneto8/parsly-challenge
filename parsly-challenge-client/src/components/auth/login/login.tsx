import {
  Button,
  Grid,
  makeStyles,
  Theme,
  TextField,
  InputAdornment,
  FormGroup,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import showFormError from '../../../util/show-form-error';
import { goto } from '../../../util/router';
import { login } from '../../../api/customers/login';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: 'auto',
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(4),
    height: 'inherit',
  },
  form: {
    display: 'inherit',
    flexFlow: 'column',
    width: '80%',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  submit: {
    width: '50%',
    marginTop: 'auto',
  },
  adornment: {
    cursor: 'pointer',
  },
}));

type LoginProperties = {
  email: string;
  password: string;
};

const Login = () => {
  const styles = useStyles();
  const [pwVisible, setPwVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoading, data, isError, error, mutateAsync } = login({
    email,
    password,
  });

  useEffect(() => {
    if (data) localStorage.setItem('token', data.token);
  }, [data]);

  const resolver = yupResolver(
    object().shape({
      email: string().email().defined().required(),
      password: string().defined().required(),
    }) as SchemaOf<LoginProperties>,
  );

  const form = useForm<LoginProperties>({
    resolver,
    reValidateMode: 'onSubmit',
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const handleLogin = async (values: LoginProperties) => {
    setEmail(values.email);
    setPassword(values.password);
    try {
      await mutateAsync({ email, password });
      await goto('/organizations', { state: { auth: { fromSignup: false } } });
    } catch (err) {}
  };

  return (
    <Grid className={styles.wrapper}>
      <form className={styles.form} onSubmit={form.handleSubmit(handleLogin)}>
        <Typography variant={'h5'} className={styles.title}>
          Already have an account? Log in
        </Typography>
        <FormGroup>
          <TextField {...form.register('email')} label={'Email'} />
          {showFormError<LoginProperties>(form.formState.errors, 'email')}
          <TextField
            {...form.register('password')}
            type={pwVisible ? 'input' : 'password'}
            label={'Password'}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  className={styles.adornment}
                  position={'end'}
                  onClick={() => setPwVisible(!pwVisible)}
                >
                  {pwVisible ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
          {showFormError<LoginProperties>(form.formState.errors, 'password')}
        </FormGroup>
        <Button
          className={styles.submit}
          variant={'contained'}
          color={'primary'}
          type={'submit'}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {isError ? <small className={'danger'}>{error?.message}</small> : null}
      </form>
    </Grid>
  );
};

export default Login;
