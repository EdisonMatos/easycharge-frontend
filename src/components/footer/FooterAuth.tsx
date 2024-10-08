/* eslint-disable */

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer(props: { [x: string]: any }) {
  let textColor = useColorModeValue('gray.400', 'white');
  let linkColor = useColorModeValue({ base: 'gray.400', lg: 'white' }, 'white');
  return (
    <Flex
      zIndex="3"
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '30px' }}
      {...props}
      className="flex justify-center pt-[50px] mb-[25px]"
    >
      <Text color={textColor} className="">
        {' '}
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          Pay4Gains Todos os direitos reservados.
          {/* <Link
            mx="3px"
            color={textColor}
            href="https://www.denjidev.com"
            target="_blank"
            fontWeight="700"
          >
            DenjiDev!
          </Link> */}
        </Text>
      </Text>
      {/* <List display="flex">
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="mailto:gqueiroz_photo@hotmail.com"
          >
            Suporte
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://www.denjidev.com/licenses"
          >
            Licença
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://denjidev.com/terms-of-service"
          >
            Termos de Uso
          </Link>
        </ListItem>
      </List> */}
    </Flex>
  );
}
