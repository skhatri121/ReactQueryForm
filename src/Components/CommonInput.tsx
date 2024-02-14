// import { Input, Box } from "@chakra-ui/react";
// import React from "react";
// import { FieldValues, UseFormRegister } from "react-hook-form";

// type CommonInputProps = {
//   register: UseFormRegister<FieldValues>;
//   name: string;
//   placeholder: string;
//   errorMessage?: string;
// };

// const CommonInput: React.FC<CommonInputProps> = ({
//   register,
//   name,
//   placeholder,
//   errorMessage,
// }) => (
//   <>
//     <Input
//       {...register(name, { required: `${placeholder} is required` })}
//       type="text"
//       placeholder={placeholder}
//     />
//     {errorMessage && <Box color="red">{errorMessage}</Box>}
//   </>
// );

// export default CommonInput;
// CommonInput.tsx

import { Input, Box } from "@chakra-ui/react";
import React from "react";

type CommonInputProps = {
  onChange: (value: string) => void;
  name: string;
  placeholder: string;
  errorMessage?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  onChange,
  placeholder,
  errorMessage,
}) => (
  <>
    <Input
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder={placeholder}
    />
    {errorMessage && <Box color="red">{errorMessage}</Box>}
  </>
);

export default CommonInput;
