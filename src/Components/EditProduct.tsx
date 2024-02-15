import { Heading } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../api/fnc";
import Form from "./Form";

const EditProduct = () => {
  const queryClient = useQueryClient();
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

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/");
    },
  });

  const handleUpdateProduct = (updatedProduct) => {
    updateProductMutation.mutate({
      id,
      ...updatedProduct,
    });
  };

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <>
      <Heading>Edit Product</Heading>
      <Form onSubmit={handleUpdateProduct} initialValue={product} />
    </>
  );
};

export default EditProduct;
