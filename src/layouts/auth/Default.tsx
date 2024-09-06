// Chakra imports
import { Box, Flex, Icon, useColorModeValue, Text } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAuth';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';
// Assets
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { ReactNode } from 'react';

function AuthIllustration(props: {
  children: ReactNode;
  illustrationBackground: string;
}) {
  const authBg = useColorModeValue('white', 'navy.900');

  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex
      bg={authBg}
      position="relative"
      h="max-content"
      className="justify-center "
    >
      <Flex justifyContent="start" direction="column" className="">
        {children}
        <Box
          display={{ base: 'none', md: 'block' }}
          h="100%"
          minH="100vh"
          w={{ lg: '50vw', '2xl': '44vw' }}
          position="absolute"
          right="0px"
          className="hidden "
          // className="hidden min-[1200px]:block"
        >
          {/* <Flex
            style={{ backgroundImage: `url(${illustrationBackground})` }}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
            className="ml-[60px]"
          /> */}
        </Box>
        <Footer />
      </Flex>
      {/* <FixedPlugin /> */}
    </Flex>
  );
}

export default AuthIllustration;
