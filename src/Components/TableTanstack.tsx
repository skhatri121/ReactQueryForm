import { Box } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const TableTanstack = (props) => {
  const [data, setData] = useState(props.products);

  const columns = props.columns || [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setData(props.products);
  }, [props.products]);

  if (!columns || columns.length === 0) {
    return <div>No columns defined.</div>;
  }

  return (
    <>
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
      </Box>
    </>
  );
};

export default TableTanstack;
