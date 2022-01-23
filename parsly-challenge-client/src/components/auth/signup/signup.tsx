import {
  Button,
  FormGroup,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, SchemaOf, string } from 'yup';
import { useForm } from 'react-hook-form';
import showFormError from '../../../util/show-form-error';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { goto } from '../../../util/router';
import { signup } from '../../../api/customers/signup';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: 'auto',
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    justifyContent: 'flex-end',
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
  name: {
    display: 'inline',
    width: '100%',
    '& > *': {
      width: '50%',
    },
  },
  submit: {
    width: '50%',
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  adornment: {
    cursor: 'pointer',
  },
}));

type SignupProperties = {
  email: string;
  password: string;
  confirmation: string;
  first_name: string;
  last_name: string;
};

const Signup = () => {
  const styles = useStyles();
  const [pwVisible, setPwVisible] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const { isLoading, data, isError, error, mutateAsync } = signup({
    email,
    password,
    first_name,
    last_name,
  });

   useEffect(() => {
    if (data)
      // TODO this will be removed because, at this point, the email hasn't been verified
      localStorage.setItem('token', data.token);

  }, [data]);

  const resolver = yupResolver(
    object().shape({
      email: string().email().defined().required(),
      first_name: string().defined().required(),
      last_name: string().defined().required(),
      password: string()
        .defined()
        .required()
        .min(8, 'Password must be longer than or equal to 8 characters'),
      confirmation: string()
        .defined()
        .required()
        .test(
          'pws equal',
          'Password and confirmation must match',
          function (v) {
            return v === this.parent.password;
          },
        ),
    }) as SchemaOf<SignupProperties>,
  );

  const form = useForm<SignupProperties>({
    resolver,
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmation: '',
      first_name: '',
      last_name: '',
    },
    mode: 'onSubmit',
  });

  const handleSignup = async (values: SignupProperties) => {
    setEmail(values.email);
    setPassword(values.password);
    setFirstName(values.first_name);
    setLastName(values.last_name);
    try {
      await mutateAsync(values)
      await goto('/page-two', { state: { auth: { fromSignup: true } } });
    } catch (err) {}
  };

  return (
    <Grid className={styles.wrapper}>
      <form className={styles.form} onSubmit={form.handleSubmit(handleSignup)}>
        <Typography align={'right'} variant={'h5'} className={styles.title}>
          New to Parsly? Create an account
        </Typography>
        <FormGroup className={styles.name}>
          <TextField {...form.register('first_name')} label={'First Name'} />
          {showFormError<SignupProperties>(form.formState.errors, 'first_name')}
          <TextField {...form.register('last_name')} label={'Last Name'} />
          {showFormError<SignupProperties>(form.formState.errors, 'last_name')}
        </FormGroup>
        <FormGroup>
          <TextField {...form.register('email')} label={'Email'} />
          {showFormError<SignupProperties>(form.formState.errors, 'email')}
          <TextField
            type={pwVisible ? 'input' : 'password'}
            {...form.register('password')}
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
          {showFormError<SignupProperties>(form.formState.errors, 'password')}
          <TextField
            type={confirmVisible ? 'input' : 'password'}
            {...form.register('confirmation')}
            label={'Confirm Password'}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  className={styles.adornment}
                  position={'end'}
                  onClick={() => setConfirmVisible(!confirmVisible)}
                >
                  {confirmVisible ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
          {showFormError<SignupProperties>(
            form.formState.errors,
            'confirmation',
          )}
        </FormGroup>
        <Button
          className={styles.submit}
          variant={'contained'}
          color={'primary'}
          type={'submit'}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
        {isError ? <small className={'danger'}>{error?.message}</small> : null}
      </form>
    </Grid>
  );
};

export default Signup;
