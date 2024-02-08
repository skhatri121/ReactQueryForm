import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import AddProduct from "../Components/AddProduct";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProducts, deleteProduct } from "../api/fnc";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id);
  };

  if (isLoading) return "Loading...";
  if (isError) return `Error:${error.message}`;

  return (
    <>
      <AddProduct />
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {products.map((product) => (
              <Box key={product.id}>
                <Box
                  cursor="pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <Heading size="xs" textTransform="uppercase">
                    {product.title}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {product.description}
                  </Text>
                </Box>
                <Text pt="2" fontSize="sm">
                  $ {product.price}
                </Text>
                <Button
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductList;
