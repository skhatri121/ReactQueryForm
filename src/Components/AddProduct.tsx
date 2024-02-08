import { useMutation, useQueryClient } from "react-query";
import Form from "./Form";
import { createProduct } from "../api/fnc";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
      <form onSubmit={handleAddProduct} initialValue={{}}>
        <Form />
      </form>
    </>
  );
};

export default AddProduct;
