'use client';

import React, { useState } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function NftMarketplace() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: { target: { files: any[] } }) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading:', selectedFile);
      setSelectedFile(null);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }} className="lg:w-[50%]">
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
            <label className="text-[14px] text-gray-500 font-medium mb-2 block">
              Clique em "Escolher arquivo" e selecione a foto do comprovante.
            </label>
            <p className="text-[14px] text-gray-500 font-medium mb-2 block">
              Após, clique em "Enviar Comprovante".
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-[24px] w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-[#1C4532] file:hover:bg-[#1C4532] file:text-white rounded"
            />
            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG, SVG, WEBP, and GIF are allowed.
            </p>
            <Button
              className="mt-[32px] rounded-md"
              colorScheme="green"
              onClick={handleUpload}
              isDisabled={!selectedFile}
            >
              Enviar Comprovante
            </Button>
          </div>
        </Card>
      </Flex>
    </Box>
  );
}
