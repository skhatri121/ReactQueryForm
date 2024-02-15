import { Input, Box } from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";
type CommonInputProps = {
  control: any;
  name: string;
  placeholder: string;
  errorMessage?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  control,
  name,
  placeholder,
  errorMessage,
}) => (
  <>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Input
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value}
            type="text"
            placeholder={placeholder}
          />
          {errorMessage && <Box color="red">{errorMessage}</Box>}
        </>
      )}
    />
  </>
);

export default CommonInput;
