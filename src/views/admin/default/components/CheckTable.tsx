import {
  Flex,
  Box,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

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
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

type RowObj = {
  name: [string, boolean];
  progress: string;
  quantity: number;
  date: string;
  info: boolean;
  deb: string;
  protested: boolean;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
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
            {info.getValue()[0]}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('progress', {
      id: 'progress',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          CÓDIGO
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          CREDOR
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          RCA
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('deb', {
      id: 'deb ',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          DÉB. ATIVO
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('protested', {
      id: 'protested',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          PROTESTO
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
  ];
  const [data, setData] = React.useState(() => [...defaultData]);
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
    <></>
    // <Card
    //   flexDirection="column"
    //   w="100%"
    //   px="0px"
    //   overflowX={{ sm: 'scroll', lg: 'hidden' }}
    // >
    //   <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
    //     <Flex px="20px" mb="8px" justifyContent="space-between" align="center">
    //       <Text
    //         color={textColor}
    //         fontSize="22px"
    //         fontWeight="700"
    //         lineHeight="100%"
    //       >
    //         Complex Table
    //       </Text>
    //       <SearchBar />
    //     </Flex>
    //     <Menu />
    //   </Flex>
    //   <Box>
    //     <Table variant="simple" color="gray.500" mb="24px" mt="12px">
    //       <Thead>
    //         {table.getHeaderGroups().map((headerGroup) => (
    //           <Tr key={headerGroup.id}>
    //             {headerGroup.headers.map((header) => {
    //               return (
    //                 <Th
    //                   key={header.id}
    //                   colSpan={header.colSpan}
    //                   pe="10px"
    //                   borderColor={borderColor}
    //                   cursor="pointer"
    //                   onClick={header.column.getToggleSortingHandler()}
    //                 >
    //                   <Flex
    //                     justifyContent="space-between"
    //                     align="center"
    //                     fontSize={{ sm: '10px', lg: '12px' }}
    //                     color="gray.400"
    //                   >
    //                     {flexRender(
    //                       header.column.columnDef.header,
    //                       header.getContext(),
    //                     )}
    //                     {{
    //                       asc: '',
    //                       desc: '',
    //                     }[header.column.getIsSorted() as string] ?? null}
    //                   </Flex>
    //                 </Th>
    //               );
    //             })}
    //           </Tr>
    //         ))}
    //       </Thead>
    //       <Tbody>
    //         {table
    //           .getRowModel()
    //           .rows.slice(0, 5)
    //           .map((row) => {
    //             return (
    //               <Tr key={row.id}>
    //                 {row.getVisibleCells().map((cell) => {
    //                   return (
    //                     <Td
    //                       key={cell.id}
    //                       fontSize={{ sm: '14px' }}
    //                       minW={{ sm: '150px', md: '200px', lg: 'auto' }}
    //                       borderColor="transparent"
    //                     >
    //                       {flexRender(
    //                         cell.column.columnDef.cell,
    //                         cell.getContext(),
    //                       )}
    //                     </Td>
    //                   );
    //                 })}
    //               </Tr>
    //             );
    //           })}
    //       </Tbody>
    //     </Table>
    //   </Box>
    // </Card>
  );
}
