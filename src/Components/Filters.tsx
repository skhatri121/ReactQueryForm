import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const productName =
    (columnFilters ?? []).find((f) => f.accessorKey === "product")?.value || "";

  const onFilterChange = (accessorKey, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.accessorKey !== accessorKey)
        .concat({ accessorKey, value })
    );

  return (
    <>
      <Box>
        <InputGroup size="sm" maxW="12rem">
          <InputRightElement>
            <IconButton
              aria-label="Search database"
              icon={<AiOutlineSearch />}
              size="30px"
            />
          </InputRightElement>
          <Input
            type="text"
            placeholder="Search "
            value={productName}
            onChange={(e) => onFilterChange("product", e.target.value)}
          />
        </InputGroup>
      </Box>
    </>
  );
};

export default Filters;
