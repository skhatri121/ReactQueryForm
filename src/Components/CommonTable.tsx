import {
  Button,
  ButtonGroup,
  Center,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CommonTable = ({ products, columns, navigate, handleDelete }) => {
  const columnHelper = () => {
    if (!columns && products.length > 0) {
      return Object.keys(products[0]);
    } else {
      return columns;
    }
  };

  const tableColumns = columnHelper();
  return (
    <Stack spacing={10}>
      <Center>
        <TableContainer w="1200px">
          <Table variant="simple">
            <Thead>
              <Tr>
                {tableColumns.map((column) => (
                  <Th key={column}>{column}</Th>
                ))}
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  {columns.map((column) => (
                    <Td
                      key={`${product.id}-${column}`}
                      cursor="pointer"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      {product[column.toLowerCase()]}
                    </Td>
                  ))}
                  <Td>
                    <ButtonGroup gap="4">
                      <Button
                        colorScheme="blue"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        mt="2"
                        size="md"
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleDelete(product.id)}
                        mt="5px"
                        size="md"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Stack>
  );
};

export default CommonTable;
