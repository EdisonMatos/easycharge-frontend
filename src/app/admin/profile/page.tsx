'use client';

// Chakra imports
import {
  Box,
  FormControl,
  Grid,
  Input,
  FormLabel,
  Button,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';

// Assets
import banner from 'img/auth/banner.png';
import avatar from 'img/avatars/avatar4.png';
import React, { useEffect, useState } from 'react';

export default function ProfileOverview() {
  const [multiplier, setMultiplier] = useState<string>('');
  const [currentMultiplier, setCurrentMultiplier ] = useState<number>(0);
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const toast = useToast();
  
  useEffect(() => {

      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },  
      };

      fetch(`https://api.pay4gains.com/multiplier`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setCurrentMultiplier(data.value)
        })
    


  }, [])
  const handleMultiplierChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    // Permitir apenas números e vírgulas
    if (/^[0-9]*[,]?[0-9]*$/.test(value)) {
      setMultiplier(value);
      setButtonActive(value.trim() !== '');
    }
  };

  const handleUpdateMultiplier = () => {

    const confirmed = window.confirm(
      `Tem certeza que deseja atualizar o multiplicador para ${multiplier}?`,
    );
    if (confirmed) {
      const requestOptions = {
        method: 'POST',
        body:JSON.stringify({
          value: multiplier
        }),
        headers: {
          "Content-Type": "application/json"
        },  
      };
      //@ts-ignore
      fetch(`https://api.pay4gains.com/multiplier`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
      toast({
        title: 'Multiplicador atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Operação cancelada.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
    // Resetar o estado
    setMultiplier('');
    setButtonActive(false);
  };

  return (
    <Box pt={{ base: '160px', md: '100px', xl: '0px' }}>
      <FormControl
        id="user-form"
        className="bg-white p-[25px] rounded-3xl lg:w-[50%] flex flex-col mb-[32px]"
      >
        <Text
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
          className="mb-[22px]"
        >
          Alterar multiplicador de pontos
        </Text>
        <p className="text-[16px] text-neutral-500 font-medium mb-[24px]">
          Adicione o novo modificador no campo abaixo.
        </p>
        <p>
          O multiplicador atual é:
          <span className="ml-[10px] font-bold text-green-500">{currentMultiplier}</span>
        </p>

        <FormLabel className="mt-[20px]">Novo multiplicador:</FormLabel>
        <Input
          placeholder="Digite um número"
          className="w-[80%]"
          value={multiplier}
          onChange={handleMultiplierChange}
        />
        <Button
          mt="4"
          className="w-[80%] rounded-md"
          colorScheme="brand"
          isDisabled={!buttonActive}
          onClick={handleUpdateMultiplier}
        >
          Atualizar multiplicador
        </Button>
      </FormControl>
      <General />
    </Box>
  );
}
