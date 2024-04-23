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
import InputMask from "react-input-mask";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';


interface State {
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
  username: string
  name: string
  taxId: string
  cellphone: string
}

export default function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  const [show, setShow] = React.useState(false);
  const [usernameUnavailable, setUsernameUnavailable] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [passwordWrong, setPasswordWrong] = React.useState(false);
  const [emailWrong, setEmailWrong] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [values, setValues] = React.useState<State>({
    email: "",
    confirmEmail: "",
    password: '',
    confirmPassword: '',
    username: '',
    name: '',
    taxId: '',
    cellphone: '',
  })

  const route = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const handleClickShow = () => setShow(!show);
  const handleClickShowConfirm = () => setShowConfirm(!showConfirm);
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    if (prop === ("email")) {
      event.target.value !== values.confirmEmail ? setEmailWrong(true) : setEmailWrong(false)
    }
    if (prop === ("confirmEmail")) {
      event.target.value !== values.email ? setEmailWrong(true) : setEmailWrong(false)
    }
    if (prop === ("password")) {
      event.target.value !== values.confirmPassword ? setPasswordWrong(true) : setPasswordWrong(false)
    }
    if (prop === ("confirmPassword")) {
      event.target.value !== values.password ? setPasswordWrong(true) : setPasswordWrong(false)
    }
    if (prop === ("username") && event.target.value) {
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      };
      fetch(`http://192.168.1.236:8080/users/usernameIsAvailable/${event.target.value}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.isAvailable) {
            setUsernameUnavailable(false)
            return 
          }
          setUsernameUnavailable(true)
        })
    }

    
  }


  const handleRegisterButton = () => {
    const { email, password, username, name, taxId, cellphone } = values
    return !(((email && password && username && name && taxId && cellphone) !== "") && !passwordWrong && !emailWrong)
  }

  const handleSignUp = async (event: any) => {
    const { email, password, username, name } = values
    let { taxId, cellphone } = values
    taxId = taxId.replaceAll(".", "").replaceAll("-", "")
    cellphone = cellphone.replaceAll(" ", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "")
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username,
        name,
        address: "Endereço padrão",
        taxId,
        cellphone
      }),
      headers: {
        "Content-Type": "application/json"
      },
    };

    fetch(`http://192.168.1.236:8080/users`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          let urlToPush = "/auth/sign-up?error=CredentialsSignup"
          data.error === "Conflict" ? urlToPush = "/auth/sign-up?error=UserAlreadyCreated" : null
          route.push(urlToPush);
          return
        }
        setIsRegistered(true)
      })
    event.preventDefault()
  }
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
          lg: '80vh',
          xl: 'auto',
        }}
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >

        {isRegistered ?
          <>
            <Box me="auto" h="70vh">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Conta registrada, por favor verifique o email cadastrado pra confirmação do registro!
              </Heading>
            </Box>
          </> : <>

            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Criar nova conta
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Insira suas informações para criar uma nova conta.
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
              <Button
                fontSize="sm"
                me="0px"
                mb="26px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bgColor={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
              >
                <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                Criar com Google
              </Button>
              <Flex align="center" mb="25px">
                <HSeparator />
                <Text color="gray.400" mx="14px">
                  ou
                </Text>
                <HSeparator />
              </Flex>
              <Box><SignUpError error={error}></SignUpError></Box>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Nome Completo<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="text"
                  placeholder="Marcelo Silva"
                  mb="24px"
                  fontWeight="500"
                  onChange={handleChange('name')}
                  size="lg"
                />
                {usernameUnavailable ?
                <>
                  <Box><SignUpError error="UserIsUnavailable"></SignUpError></Box>
                  </> : null}
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Nome de usuário<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="text"
                  placeholder="celosilva25"
                  mb="24px"
                  fontWeight="500"
                  onChange={handleChange('username')}
                  size="lg"
                />
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  CPF<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="text"
                  as={InputMask} mask="***.***.***-**" maskChar={null}
                  placeholder="082.644.235-23"
                  mb="24px"
                  fontWeight="500"
                  onChange={handleChange('taxId')}
                  size="lg"
                />
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Telefone<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="text"
                  as={InputMask} mask="+** (**) *****-****" maskChar={null}
                  placeholder="+55 (73) 98802-5229"
                  mb="24px"
                  fontWeight="500"
                  onChange={handleChange('cellphone')}
                  size="lg"
                />
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
                  onChange={handleChange('email')}
                  size="lg"
                />
                                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Confirmar email<Text color={brandStars}>*</Text>
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
                  onChange={handleChange('confirmEmail')}
                  size="lg"
                />
                {emailWrong ?<Box><MustBeSameError message={"Emails não conhecidem!"}></MustBeSameError></Box> : null}
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
                    onChange={handleChange('password')}
                    type={show ? 'text' : 'password'}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
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
                    placeholder="Min. 8 caracteres"
                    mb="24px"
                    size="lg"
                    onChange={handleChange("confirmPassword")}
                    type={showConfirm ? 'text' : 'password'}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={showConfirm ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClickShowConfirm}
                    />
                  </InputRightElement>
                </InputGroup>
                {passwordWrong ? <Box><MustBeSameError message={"Senhas não conhecidem!"}></MustBeSameError></Box> : null}
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  isDisabled={handleRegisterButton()}
                  onClick={handleSignUp}
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Cadastrar
                </Button>
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
              </Flex>
            </Flex></>}
      </Flex>
    </DefaultAuthLayout>
  );
}

//@ts-ignore
const MustBeSameError = ({message}) => {
  //@ts-ignore
  const textColorError = useColorModeValue('red.700', 'white');
  return (
    <Text color={textColorError} fontWeight="300" fontSize="14px">
      {message}
    </Text>)
};


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
  UserAlreadyCreated:
    'Já existe uma conta com esses dados. Ao invés disso,',
    UserIsUnavailable:
    'Nome de usuário está em uso',
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
      {error === "UserAlreadyCreated" ?
          <Link href={'http://192.168.1.236:3000/auth/sign-in'} >
            <Text color={textColorError} fontWeight="300" fontSize="14px" as='u'>tente logar</Text>
          </Link>
       :
        null}
    </Text>)
};