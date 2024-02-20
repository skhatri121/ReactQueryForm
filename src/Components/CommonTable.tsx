import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const CommonTable = ({
  products,
  selectedProductIds,
  handleCheckboxChange,
  navigate,
  handleDelete,
}) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Product Title</Th>
          <Th>Description</Th>
          <Th isNumeric>Price</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>
              <input
                type="checkbox"
                checked={selectedProductIds.includes(product.id)}
                onChange={() => handleCheckboxChange(product.id)}
              />
            </Td>
            <Td
              cursor="pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.title}
            </Td>
            <Td
              cursor="pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.description}
            </Td>
            <Td
              isNumeric
              cursor="pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              $ {product.price}
            </Td>
            <Td>
              <Button
                onClick={() => navigate(`/products/${product.id}/edit`)}
                mt="2"
                bg="primary.51"
              >
                Edit
              </Button>
              <Button
                disabled={selectedProductIds.length === 0}
                onClick={handleDelete}
                mt="5px"
                bg="primary.54"
                color="primary.59"
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CommonTable;
