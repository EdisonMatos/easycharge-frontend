// Chakra imports
import {
  Flex,
  useColorModeValue,
  Text,
  AspectRatio,
  Image,
  Avatar,
  FormLabel,
} from '@chakra-ui/react';
// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';
import Logo from '../../../../public/img/new/CashLogo.png';
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');
  let secondColor = useColorModeValue('brand.500', 'white');

  return (
    <Flex alignItems="center" flexDirection="column" className="w-[95%]">
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Flex alignItems="center" flexDirection="row">
        <Text color={logoColor} fontSize="3xl" ms="5px" fontWeight="700">
          Pay4
        </Text>
        <Text color={secondColor} fontSize="3xl" ms="5px" fontWeight="700">
          Gains
        </Text>
      </Flex>
      <HSeparator mb="20px" mt="20px" />
    </Flex>
  );
}

export default SidebarBrand;
