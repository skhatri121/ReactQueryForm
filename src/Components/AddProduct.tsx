import { useMutation, useQueryClient } from "react-query";
import Form from "./Form";
import { createProduct } from "../api/fnc";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type FormField = {
  ProductTitle: string;
  ProductDescription: string;
  ProductPrice: string;
};

const AddProduct = () => {
  const queryClient = useQueryClient();
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("success bro!");
      // window.location.reload();
    },
  });

  const handleAddProduct: SubmitHandler<FormField> = (product) => {
    createProductMutation.mutate({
      id: uuidv4(),
      ...product,
    });
  };

  return (
    <>
      <Form onSubmit={handleAddProduct} />
    </>
  );
};

export default AddProduct;
