'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useRouter } from 'next/navigation'; // Importando o useRouter para redirecionamento

export default function NftMarketplace() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter(); // Inicializando o useRouter

  const [selectedFile, setSelectedFile] = useState(null);
  const [identification, setIdentification] = useState('');

  const handleFileChange = (event: { target: { files: any[] } }) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIdentificationChange = (event: { target: { value: string } }) => {
    setIdentification(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile && identification) {
      console.log('Uploading:', selectedFile);
      setSelectedFile(null);
      setIdentification('');

      // Exibe o alerta e redireciona após o clique em OK
      window.alert(
        'Seu comprovante foi enviado com sucesso. \nVocê será redirecionado para a seção de "Meus Envios" para acompanhar sua solicitação.',
      );
      router.push('/admin/data-tables'); // Redireciona para a rota desejada
    } else {
      console.log('No file selected or identification not filled');
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} className="lg:w-[50%]">
      {/* Main Fields */}
      <Flex flexDirection="column">
        <Card className="p-[25px]" p="0px">
          <Text
            className="mb-[24px]"
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Como funciona?
          </Text>
          <p className="text-[16px] text-neutral-500 font-medium">
            Após fazer o depósito, utilize o botão abaixo para enviar para nós o
            comprovante. Após confirmarmos, iremos disponibilizar o seus pontos,
            que serão convertidos em dinheiro e depositados em sua conta. <br />
            <br />
            Você pode acompanhar o andamento da sua solicitação em "Meus Envios"
          </p>
          <Text
            className="my-[24px]"
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Enviando seu comprovante de depósito:
          </Text>

          <div className="">
            <FormLabel>Identificação:</FormLabel>
            <Input
              placeholder="Ex: Depósito R$ 300,00 PanattaCasino"
              type="text"
              className="w-[100%]"
              value={identification}
              onChange={handleIdentificationChange}
            />
            <p className="mt-2 text-xs text-gray-400">
              A identificação irá facilitar a diferenciar os comprovantes
              futuramente.
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-[24px] w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-[#1C4532] file:hover:bg-[#1C4532] file:text-white rounded"
            />
            <p className="mt-2 text-xs text-gray-400">
              Formatos permitidos: PNG, JPG, SVG, WEBP, e GIF.
            </p>
            <Button
              className="mt-[32px] rounded-md"
              colorScheme="green"
              onClick={handleUpload}
              isDisabled={!selectedFile || !identification}
            >
              Enviar Comprovante
            </Button>
          </div>
        </Card>
      </Flex>
    </Box>
  );
}
