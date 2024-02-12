import { Button } from "@chakra-ui/react";
import React from "react";
type CommonButtonProps = {
  label: String;
};
const CommonButton: React.FC<CommonButtonProps> = ({ label }) => (
  <Button type="submit">{label}</Button>
);
export default CommonButton;
