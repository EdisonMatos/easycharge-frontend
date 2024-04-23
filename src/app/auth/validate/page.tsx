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

import React, { useEffect } from 'react';
// Chakra imports
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { redirect, useRouter, useSearchParams } from 'next/navigation';

export default function Validate() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');

  const [validation, setValidation] = React.useState({isValidated: false, message:""});
  const [isLoading, setIsLoading] = React.useState(true);
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const route = useRouter()
  useEffect(() => {

    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        token,
        email
      }),
      headers: {
        "Content-Type": "application/json"
      },  
    };
    fetch(`http://192.168.1.236:8080/users/validate`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let message = "Link de confirmação inválido ou expirado!"
        let isValidated = false
        setIsLoading(false)
        if(data.isValidated){
          message = "Cadastro concluído com sucesso!"
          isValidated = data.isValidated
        }
        setValidation({ isValidated, message })

        setTimeout(()=>{
          route.push("/auth/sign-in")
        }, 4000)
      })

  }, [])

  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/bg-purple2.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w={{
          sm: "90%",
          md: "50%"
        }}
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h={{
          sm: 'auto',
          md: 'auto',
          lg: '70vh',
          xl: '70vh',
        }}
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >

        <Box me="auto">
          {isLoading ? (
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          ) : (
            <Heading color={textColor} fontSize="36px" mb="10px">
              { validation.message }
            </Heading>)
          }
        </Box>

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
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Login falhou. Verifique se as credenciais providas estão corretas.',
  default: 'Não foi possível entrar.',
};

//@ts-ignore
const SignInError = ({ error }) => {
  //@ts-ignore
  const errorMessage = error && (errors[error] ?? errors.default);
  const textColorError = useColorModeValue('red.700', 'white');
  return (
    <Text color={textColorError} fontWeight="300" fontSize="14px">
      {errorMessage}
    </Text>)
};