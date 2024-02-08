import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../api/fnc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Form from "./Form";
import { SubmitHandler } from "react-hook-form";

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

  if (isLoading) return "Loading...";
  if (isError) return `Error:${error.message}`;

  const handleUpdateProduct: SubmitHandler<FormField> = (updatedProduct) => {
    updateProductMutation.mutate({
      id,
      ...updatedProduct,
    });
  };
  return (
    <>
      <Form onSubmit={handleUpdateProduct} initialValue={product} />
    </>
  );
};

export default EditProduct;
