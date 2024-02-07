import { useMutation, useQueryClient } from "react-query";
import Form from "./Form";
import { createProduct } from "../api/fnc";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("success bro!");
    },
  });
  const handleAddProduct = (product) => {
    createProductMutation.mutate({
      id: 3,
      ...product,
    });
  };

  return (
    <>
      <Form onSubmit={handleAddProduct} initialValue={{}} />
    </>
  );
};

export default AddProduct;
