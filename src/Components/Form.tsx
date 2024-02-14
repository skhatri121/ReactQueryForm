// import { Box, Button } from "@chakra-ui/react";
// import React from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import CommonInput from "./CommonInput";

// type FormProps = {
//   onSubmit: SubmitHandler<FormField>;
//   initialValue: FormField;
// };

// type FormField = {
//   title: string;
//   description: string;
//   price: string;
// };

// const Form: React.FC<FormProps> = ({ onSubmit, initialValue }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormField>();

//   React.useEffect(() => {
//     if (initialValue) {
//       setValue("title", initialValue.title || "");
//       setValue("description", initialValue.description || "");
//       setValue("price", initialValue.price || "");
//     }
//   }, [initialValue, setValue]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Box p="10px 20px">
//         <CommonInput
//           register={register}
//           name="title"
//           placeholder="Product Title"
//           errorMessage={errors.title?.message}
//         />

//         <CommonInput
//           register={register}
//           name="description"
//           placeholder="Product Description"
//           errorMessage={errors.description?.message}
//         />

//         <CommonInput
//           register={register}
//           name="price"
//           placeholder="Product Price"
//           errorMessage={errors.price?.message}
//         />

//         <Button
//           type="submit"
//           variant="variant.2"
//           bg="primary.60"
//           color="primary.59"
//         >
//           Submit
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default Form;

// Form.tsx
import { useForm, Controller } from "react-hook-form";
import CommonInput from "./CommonInput";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  ProductTitle: string;
  ProductDescription: string;
  ProductPrice: string;
};

interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

function Form({ onSubmit }: FormProps) {
  const { handleSubmit, control } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="ProductTitle"
        render={({ field: { onChange, value } }) => (
          <CommonInput
            onChange={onChange}
            name="ProductTitle"
            placeholder="Product Title"
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="ProductDescription"
        render={({ field: { onChange, value } }) => (
          <CommonInput
            onChange={onChange}
            name="ProductDescription"
            placeholder="Product Description"
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="ProductPrice"
        render={({ field: { onChange, value } }) => (
          <CommonInput
            onChange={onChange}
            name="ProductPrice"
            placeholder="Product Price"
            value={value}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
}

export default Form;
