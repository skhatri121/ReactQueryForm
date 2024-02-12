import { Button, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../api/fnc";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: product,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error:${error.message}`;

  return (
    <>
      <Heading>{product.title}</Heading>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Button onClick={() => navigate("/")}>Back to product list</Button>
    </>
  );
};

export default Product;
