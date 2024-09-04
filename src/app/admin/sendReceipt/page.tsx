'use client';
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

import React from 'react';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';

// Custom components
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators';
import HistoryItem from 'views/admin/marketplace/components/HistoryItem';
import NFT from 'components/card/NFT';
import Card from 'components/card/Card';
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';

// Assets
import Nft1 from 'img/nfts/Nft1.png';
import Nft2 from 'img/nfts/Nft2.png';
import Nft3 from 'img/nfts/Nft3.png';
import Nft4 from 'img/nfts/Nft4.png';
import Nft5 from 'img/nfts/Nft5.png';
import Nft6 from 'img/nfts/Nft6.png';
import Avatar1 from 'img/avatars/avatar1.png';
import Avatar2 from 'img/avatars/avatar2.png';
import Avatar3 from 'img/avatars/avatar3.png';
import Avatar4 from 'img/avatars/avatar4.png';
import AdminLayout from 'layouts/admin';

export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}

      <Flex flexDirection="column">
        <Card p="0px">
          <Flex
            align={{ sm: 'flex-start', lg: 'center' }}
            justify="space-between"
            w="100%"
            px="22px"
            py="18px"
          >
            <Text color={textColor} fontSize="xl" fontWeight="600">
              Envie seu comprovante de depósito
            </Text>
          </Flex>
        </Card>
      </Flex>
      {/* Delete Product */}
    </Box>
  );
}
