import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  //update table when changes
  useEffect(() => {
    setData(props.products);
  }, [props.products]);

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
