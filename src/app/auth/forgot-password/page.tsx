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

import React, { ChangeEvent } from 'react';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { useRouter, useSearchParams } from 'next/navigation';

export default function ForgotPassword() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const route = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleChangePassword = async (event: any) => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`https://api.pay4gains.com/users/changePassword`, requestOptions)
      .then((response) => response ?? response.json())
      .then((data) => {
        if (data.error) {
          let urlToPush = '/auth/forgot-password?error=CredentialsSignup';
          route.push(urlToPush);
          return;
        }
        setIsRegistered(true);
      });
    event.preventDefault();
  };
  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/bg-purple2.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w={{
          sm: '90%',
          md: '50%',
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
        {isRegistered ? (
          <>
            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Alteração de senha solicitada! Por favor verifique o email
                cadastrado pra alteração.
              </Heading>
            </Box>
          </>
        ) : (
          <>
            <Box me="auto">
              <Link href="/auth/sign-in">
                <Text
                  className="mb-[24px] flex items-center"
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  <span className="text-[20px] mr-[6px]">⬅</span> Voltar
                </Text>
              </Link>
              <Heading color={textColor} fontSize="36px" mb="10px">
                Recuperar senha
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Insira seus dados para receber o email para alteração de senha.
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
                <SignUpError error={error}></SignUpError>
              </Box>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="email"
                  placeholder="mail@easycharge.com"
                  mb="24px"
                  fontWeight="500"
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  isDisabled={!(email !== '')}
                  onClick={handleChangePassword}
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Recuperar
                </Button>
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                maxW="100%"
                mt="0px"
              ></Flex>
            </Flex>
          </>
        )}
      </Flex>
    </DefaultAuthLayout>
  );
}

//@ts-ignore

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
  CredentialsSignup:
    'Cadastro falhou. Verifique se as informações providas estão corretas.',
  UserAlreadyCreated: 'Já existe uma conta com esses dados. Ao invés disso,',
  UserIsUnavailable: 'Nome de usuário está em uso',
  default: 'Não foi possível entrar.',
};

//@ts-ignore
const SignUpError = ({ error }) => {
  //@ts-ignore
  const errorMessage = error && (errors[error] ?? errors.default);
  const textColorError = useColorModeValue('red.700', 'white');
  return (
    <Text color={textColorError} fontWeight="300" fontSize="14px">
      {errorMessage}{' '}
      {error === 'UserAlreadyCreated' ? (
        <Link href={'http://192.168.1.236:3000/auth/sign-in'}>
          <Text color={textColorError} fontWeight="300" fontSize="14px" as="u">
            tente logar
          </Text>
        </Link>
      ) : null}
    </Text>
  );
};
