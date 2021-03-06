import React, { useState } from 'react';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { register } from '../../features/authReducer';
import { useDispatch } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';

const RegisterForm = () => {

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Requerido'),
    lastName: Yup.string()
      .required('Requerido'),
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Requerido'),
    password: Yup.string()
      .min(6, 'Debe tener un mínimo de 6 caracteres')
      .max(16, 'Tu contraseña debe de tener entre 6 y 16 caracteres')
      .required('Requerido')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
        ,'Debe tener al menos una letra, un número y un caracter especial (!@#$%)'),
    confirmPassword: Yup.string()
      .required('Requerido')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas ingresadas no coinciden')
  });

  return (
    <Flex 
      height='100%'
      direction='column'
      alignItems='center'
    >
      <Box>
        <Image 
          src='/images/logo-ong.png'
          alt='Logo Somos Más'
          boxSize='200px'
        />
      </Box>
      <Box 
        padding={8}
        minWidth={'sm' | 'md'}
        borderWidth={1}
        borderRadius={8}
        boxShadow='lg'
      >
        <Box textAlign='center'>
          <Heading as='h1'>Registrarse</Heading>
        </Box>
        <Divider marginY={6} />
        <Box marginY={4} textAlign='left'>
          <Formik
            initialValues={{
              name: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dispatch(register({ ...values, role_id: 0, name: 'Test' }));
            }}
          >
            {({errors, touched}) => (
              <Form>
                <FormControl >
                  <InputGroup>
                    <FormControl display='flex' flexDirection='column' isRequired isInvalid={touched.name && errors.name}>
                      <FormLabel htmlFor="name">Nombre</FormLabel>
                      <Field
                        as={Input}
                        id='name'
                        name='name'
                        autoComplete='off'
                      />
                      <ErrorMessage data-testid="ErrorNombre" component={FormErrorMessage} name='name' />
                    </FormControl>
                    <FormControl isRequired isInvalid={touched.name && errors.name} display='flex' flexDirection='column' marginLeft={4}>
                      <FormLabel htmlFor='lastName'>Apellido</FormLabel>
                      <Field
                        as={Input}
                        id='lastName'
                        name='lastName'
                        autoComplete='off'
                      />
                      <ErrorMessage data-testid="errorLastName" component={FormErrorMessage} name='lastName' />
                    </FormControl>
                  </InputGroup>
                </FormControl>

                <FormControl marginTop={2} isRequired isInvalid={touched.email && errors.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Field 
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='off'
                  />
                  <ErrorMessage data-testid="ErrorEmail" component={FormErrorMessage} name='email' />
                </FormControl>

                <FormControl marginTop={6} isRequired isInvalid={touched.password && errors.password}>
                  <FormLabel htmlFor='password'>Contraseña</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id='password'
                      name='password'
                      type='password'
                      data-testid="Password"
                    />
                    <InputRightElement>
                      <Tooltip 
                        label='Su contraseña debe tener un mínimo 6 caracteres, 
                      contener al menos un número, una letra y 
                      un caracter especial (!@#$%).'
                        backgroundColor='#DB5752'
                      >
                        <span>
                          <MdInfo fontSize='20px' color='#DB5752' />
                        </span>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage data-testid="ErrorPassword" component={FormErrorMessage} name='password' />
                </FormControl>

                <FormControl marginTop={2} isRequired isInvalid={touched.confirmPassword && errors.confirmPassword}>
                  <FormLabel htmlFor='confirmPassword'>Confirmar contraseña</FormLabel>
                  <Field
                    as={Input}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                  />
                  <ErrorMessage data-testid="ErrorConfirmPassword" component={FormErrorMessage} name='confirmPassword' />
                </FormControl>
                <Button
                  width='full'
                  marginTop={4}
                  type='submit'
                  backgroundColor='#9AC9FB'
                  color='#000'
                  _hover={{
                    bg: '#5FA5ED'
                  }}
                  _active={{
                    bg: '#5FA5ED'
                  }}
                >
                  Registrarse
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Link to='/login'>¿Ya tienes una cuenta? Inicia sesión.</Link>
        <Box marginTop={2}>
          <Link to='/'>
            <Box display='flex' alignItems='center'>
              <BiArrowBack /> Regresar
            </Box>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};
 
export default RegisterForm;