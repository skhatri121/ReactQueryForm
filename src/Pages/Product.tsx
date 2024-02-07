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
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error:${error.message}`;

  return (
    <>
      <Heading>{products.title}</Heading>
      <Text>{products.description}</Text>
      <Button onClick={() => navigate("/")}>Back to product list</Button>
    </>
  );
};

export default Product;
