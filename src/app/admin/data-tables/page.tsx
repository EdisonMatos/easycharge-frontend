'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment';
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import React, { useEffect, useState } from 'react';
import AdminLayout from 'layouts/admin';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

export default function DataTables() {

  return (
    <Box pt={{ base: '160px', md: '100px', xl: '0px' }}>
      <SimpleGrid
        mb="20px"
        spacing={{ base: '20px', xl: '20px' }}
        className="lg:w-[50%]"
      >
        <DevelopmentTable tableData={tableDataDevelopment} />
        <CheckTable tableData={tableDataCheck} />
        <ColumnsTable tableData={tableDataColumns} />
        <ComplexTable />
      </SimpleGrid>
    </Box>
  );
}
