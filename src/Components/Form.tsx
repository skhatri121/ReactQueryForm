import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CommonInput from "./CommonInput";

type FormProps = {
  onSubmit: SubmitHandler<FormField>;
  initialValue: FormField;
};

type FormField = {
  title: string;
  description: string;
  price: string;
};

const Form: React.FC<FormProps> = ({ onSubmit, initialValue }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormField>();

  React.useEffect(() => {
    if (initialValue) {
      setValue("title", initialValue.title || "");
      setValue("description", initialValue.description || "");
      setValue("price", initialValue.price || "");
    }
  }, [initialValue, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p="10px 20px">
        <CommonInput
          register={register}
          name="title"
          placeholder="Product Title"
          errorMessage={errors.title?.message}
        />

        <CommonInput
          register={register}
          name="description"
          placeholder="Product Description"
          errorMessage={errors.description?.message}
        />

        <CommonInput
          register={register}
          name="price"
          placeholder="Product Price"
          errorMessage={errors.price?.message}
        />

        <Button
          type="submit"
          variant="variant.2"
          bg="primary.60"
          color="primary.59"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Form;
