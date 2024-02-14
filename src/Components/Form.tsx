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
