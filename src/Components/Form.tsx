import { Box, Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormProps = {
  onSubmit: SubmitHandler<FormField>;
};

type FormField = {
  title: string;
  description: string;
  price: string;
};
const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p="10px 20px">
          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Product Title"
          />
          {errors.title && <Box color="red">{errors.title.message}</Box>}
          <Input
            mt="5px"
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            placeholder="Product Description"
          />
          {errors.description && (
            <Box color="red">{errors.description.message}</Box>
          )}

          <Input
            mt="5px"
            {...register("price", { required: "Price is required" })}
            type="text"
            placeholder="Product Price"
          />
          {errors.price && <Box color="red">{errors.price.message}</Box>}

          <Button type="submit" mt="5px">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Form;