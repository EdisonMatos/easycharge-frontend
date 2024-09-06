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

import {
  Box,
  Flex,
  FormLabel,
  Image,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import CheckTable from 'views/admin/default/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
// Assets
import Usa from 'img/dashboards/usa.png';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
export default function Default() {
  const [userData, setUserData] = useState({availablePoints:0, totalWithdraw:0, receipts:[]});
  const { data: session, status } = useSession()
  if (session === null && status === 'unauthenticated') {
    redirect("/auth/sign-in")
  }



  useEffect(() => {
    if (session) {
      //@ts-ignore
      const token = session?.accessToken
      const decoded = jwtDecode(token);

      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },  
      };
      //@ts-ignore
      fetch(`https://api.pay4gains.com/users/findByEmail/${decoded.email}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          const {receipts, availablePoints, totalWithdraw } = data
          setUserData({receipts, availablePoints, totalWithdraw})
        })
    }


  }, [session])

  const brandColor = useColorModeValue('brand.500', 'white');
  const negativeColor = useColorModeValue('red.600', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap="20px"
        mb="20px"
      >
        {/* <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Negociação mensal"
          value="R$350,40"
        /> */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Pontos"
          value={userData.availablePoints}
        />
        {/* <MiniStatistics
          growth="+23%"
          name="Valores recebidos"
          value="R$574,34"
        /> */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="28px" h="28px" as={MdAddTask} color={brandColor} />
              }
            />
          }
          name="Saques efetivados"
          value={`R$ ${userData.totalWithdraw}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Comprovantes enviados"
          value={userData.receipts.length}
        />
        {/* <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdAttachMoney}
                  color={negativeColor}
                />
              }
            />
          }
          name="Clientes em atraso"
          value="2935"
        /> */}
      </SimpleGrid>

      <SimpleGrid>
        <TotalSpent />
      </SimpleGrid>
    </Box>
  );
}
