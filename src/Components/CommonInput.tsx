import { Input, Box } from "@chakra-ui/react";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type CommonInputProps = {
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  errorMessage?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  register,
  name,
  placeholder,
  errorMessage,
}) => (
  <>
    <Input
      {...register(name, { required: `${placeholder} is required` })}
      type="text"
      placeholder={placeholder}
    />
    {errorMessage && <Box color="red">{errorMessage}</Box>}
  </>
);

export default CommonInput;
