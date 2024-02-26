// import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useEffect, useState } from "react";
// import Filters from "./Filters";

// const TableTanstack = (props) => {
//   const [data, setData] = useState(props.products);

//   const [columnFilters, setColumnFilters] = useState([]);

//   const columns = props.columns || [];

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       columnFilters,
//     },
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   useEffect(() => {
//     setData(props.products);
//   }, [props.products]);

//   return (
//     <>
//       <Filters
//         columnFilters={columnFilters}
//         setColumnFilters={setColumnFilters}
//       />
//       <Box bg="primary.50" color="primary.59">
//         <Box>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <Box
//               key={headerGroup.id}
//               display="flex"
//               justifyContent="space-around"
//             >
//               {headerGroup.headers.map((header) => (
//                 <Box key={header.id}>{header.column.columnDef.header}</Box>
//               ))}
//             </Box>
//           ))}
//         </Box>
//         <Box>
//           {table.getRowModel().rows.map((row) => (
//             <Box
//               key={row.id}
//               display="flex"
//               justifyContent="space-around"
//               onClick={() => props.navigate(`/products/${row.original.id}`)}
//               style={{ cursor: "pointer" }}
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <Box key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </Box>
//               ))}
//             </Box>
//           ))}
//         </Box>
//         <Text>
//           Page
//           {table.getState().pagination.pageIndex + 1} of {""}
//           {table.getPageCount()}
//         </Text>
//         <ButtonGroup>
//           <Button
//             onClick={() => table.previousPage()}
//             isDisabled={!table.getCanPreviousPage()}
//           >
//             {"<"}
//           </Button>
//           <Button
//             onClick={() => table.nextPage()}
//             isDisabled={!table.getCanNextPage()}
//           >
//             {">"}
//           </Button>
//         </ButtonGroup>
//       </Box>
//     </>
//   );
// };

// export default TableTanstack;

import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filters from "./Filters";

const TableTanstack = (props) => {
  const [data, setData] = useState(props.products);
  const [columnFilters, setColumnFilters] = useState([]);
  const columns = props.columns || [];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setData(props.products);
  }, [props.products]);

  useEffect(() => {
    // Apply filters to the data and set it back to 'data'
    const filteredData = applyFilters(props.products, columnFilters);
    setData(filteredData);
  }, [columnFilters, props.products]);

  // const applyFilters = (data, filters) => {
  //   return data.filter((item) => {
  //     return filters.every((filter) => {
  //       return String(item[filter.accessorKey])
  //         .toLowerCase()
  //         .includes(filter.value.toLowerCase());
  //     });
  //   });
  // };

  const applyFilters = (data, filters) => {
    return data.filter((products) => {
      const matches = filters.map((filter) => {
        const cellValue = String(products[filter.accessorKey]).toLowerCase();
        const filterValue = filter.value.toLowerCase();
        const match = cellValue.includes(filterValue);
        console.log(
          `Filtering: ${filter.accessorKey}, ${cellValue}, ${filterValue}, ${match}`
        );
        return match;
      });
      console.log("Row Matches:", matches);
      return matches.every(Boolean);
    });
  };

  return (
    <>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <Box bg="primary.50" color="primary.59">
        <Box>
          {table.getHeaderGroups().map((headerGroup) => (
            <Box
              key={headerGroup.id}
              display="flex"
              justifyContent="space-around"
            >
              {headerGroup.headers.map((header) => (
                <Box key={header.id}>{header.column.columnDef.header}</Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box>
          {table.getRowModel().rows.map((row) => (
            <Box
              key={row.id}
              display="flex"
              justifyContent="space-around"
              onClick={() => props.navigate(`/products/${row.original.id}`)}
              style={{ cursor: "pointer" }}
            >
              {row.getVisibleCells().map((cell) => (
                <Box key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Text>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <ButtonGroup>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default TableTanstack;
