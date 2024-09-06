import {
  Box,
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { jwtDecode } from "jwt-decode";

type RowObj = {
  identification: string;
  status: string;
  createdAt: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [data, setData] = React.useState(() => []);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
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
      fetch(`https://api.pay4gains.com/receipts/findAllPerUserEmail/${decoded.email}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setData(data)
        })
    }
  }, [session])
  const columns = [
    columnHelper.accessor('identification', {
      id: 'identification',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          NOME
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          STATUS
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              info.getValue() === 'APPROVED'
                ? 'green.500'
                : info.getValue() === 'DENIED'
                ? 'red.500'
                : info.getValue() === 'PENDING'
                ? 'orange.500'
                : null
            }
            as={
              info.getValue() === 'APPROVED'
                ? MdCheckCircle
                : info.getValue() === 'DENIED'
                ? MdCancel
                : info.getValue() === 'PENDING'
                ? MdOutlineError
                : null
            }
          />
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          DATA
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {new Date(info.getValue()).toLocaleDateString("pt-BR")}
        </Text>
      ),
    }),
  ];

  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Meus Envios
        </Text>
      </Flex>
      <Box className="">
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 11)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
