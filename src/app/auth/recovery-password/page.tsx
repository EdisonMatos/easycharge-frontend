'use client';
/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { ChangeEvent, useEffect } from 'react';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
interface State {
  password: string;
  confirmPassword: string;
}
export default function RecoveryPassword() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isChanged, setIsChanged] = React.useState(false);
  const [isChangedMessage, setIsChangedMessage] = React.useState(
    'Senha alterada com sucesso!',
  );
  const [passwordWrong, setPasswordWrong] = React.useState(true);
  const [values, setValues] = React.useState<State>({
    password: '',
    confirmPassword: '',
  });
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const error = searchParams.get('error');
  const route = useRouter();

  const handleClickShow = () => setShow(!show);
  const handleClickShowConfirm = () => setShowConfirm(!showConfirm);

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      if (prop === 'password') {
        event.target.value !== values.confirmPassword
          ? setPasswordWrong(true)
          : setPasswordWrong(false);
      }
      if (prop === 'confirmPassword') {
        event.target.value !== values.password
          ? setPasswordWrong(true)
          : setPasswordWrong(false);
      }
    };

  const handleRecovery = async (event: any) => {
    const { password } = values;
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        email,
        password,
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`http://192.168.1.236:8080/users/recoveryPassword`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          if (data.error === 'Unauthorized') {
            setIsChanged(true);
            setIsChangedMessage('Token inválido ou expirado.');
            return;
          }

          if (
            data.error === 'Bad Request' &&
            data.message.some(
              (e: string) => e === 'password is not strong enough',
            )
          ) {
            route.push('/auth/recovery-password?error=StrongPassword');
            return;
          }
          let urlToPush = '/auth/recovery-password?error=CredentialsSignup';
          data.error === 'Conflict'
            ? (urlToPush = '/auth/recovery-password?error=InvalidPassword')
            : null;
          route.push(urlToPush);
          return;
        }
        setIsChanged(true);
        setTimeout(() => {
          route.push('/auth/sign-in');
        }, 4000);
      });
    event.preventDefault();
  };
  // useEffect(() => {

  //   const requestOptions = {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       token,
  //       email
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   };
  //   fetch(`http://192.168.1.236:8080/users/validate`, requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       let message = "Link de confirmação inválido ou expirado!"
  //       let isValidated = false
  //       setIsLoading(false)
  //       if(data.isValidated){
  //         message = "Cadastro concluído com sucesso!"
  //         isValidated = data.isValidated
  //       }
  //       setValidation({ isValidated, message })

  //       setTimeout(()=>{
  //         route.push("/auth/sign-in")
  //       }, 4000)
  //     })

  // }, [])

  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/bg-purple2.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w={{
          sm: '100%',
        }}
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h={{
          sm: 'auto',
          md: 'auto',
          lg: '80vh',
          xl: '70vh',
        }}
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        {isChanged ? (
          <>
            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                {isChangedMessage}
              </Heading>
            </Box>
          </>
        ) : (
          <>
            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Alterar senha
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Digite sua nova senha para alteração.
              </Text>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: '100%', md: '420px' }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: 'auto', lg: 'unset' }}
              me="auto"
              mb={{ base: '20px', md: 'auto' }}
            >
              <Box>
                <RecoveryPasswordError error={error}></RecoveryPasswordError>
              </Box>
              <FormControl>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Senha<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 caracteres"
                    mb="24px"
                    size="lg"
                    minLength={8}
                    onChange={handleChange('password')}
                    type={show ? 'text' : 'password'}
                    variant="auth"
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClickShow}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Confirmar senha<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 caracteres, letras maiúsculas, minúsculas e símbolos(@,#)"
                    mb="24px"
                    size="lg"
                    onChange={handleChange('confirmPassword')}
                    type={showConfirm ? 'text' : 'password'}
                    variant="auth"
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={showConfirm ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClickShowConfirm}
                    />
                  </InputRightElement>
                </InputGroup>
                {passwordWrong ? (
                  <Box>
                    <PasswordError></PasswordError>
                  </Box>
                ) : null}
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  isDisabled={passwordWrong}
                  onClick={handleRecovery}
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Alterar senha
                </Button>
              </FormControl>
            </Flex>
          </>
        )}
      </Flex>
    </DefaultAuthLayout>
  );
}

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  InvalidPassword: 'Senha precisa ser diferente da anterior.',
  StrongPassword:
    'Senha não é forte o suficiente, utilize símbolos, letras maiúsculas e números',
  InvalidToken: 'Token inválido ou expirado, tente novamente.',
  CredentialsSignin:
    'Login falhou. Verifique se as credenciais providas estão corretas.',
  default: 'Não foi possível alterar senha.',
};

//@ts-ignore
const RecoveryPasswordError = ({ error }) => {
  //@ts-ignore
  const errorMessage = error && (errors[error] ?? errors.default);
  const textColorError = useColorModeValue('red.700', 'white');
  return (
    <Text color={textColorError} fontWeight="300" fontSize="14px">
      {errorMessage}
    </Text>
  );
};

//@ts-ignore
const PasswordError = () => {
  //@ts-ignore
  const textColorError = useColorModeValue('red.700', 'white');
  return (
    <Text color={textColorError} fontWeight="300" fontSize="14px">
      Senhas não conhecidem!
    </Text>
  );
};
