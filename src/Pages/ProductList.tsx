import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProducts, deleteProduct } from "../api/fnc";
import { useNavigate } from "react-router-dom";

import AddProduct from "../Components/AddProduct";
import TableTanstack from "../Components/TableTanstack";
import { ButtonGroup, Button } from "@chakra-ui/react";

const ProductList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSelectedProductIds([]);
    },
  });

  const handleDelete = (productId) => {
    deleteProductMutation.mutate(productId);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProductIds((prevSelectedProductIds) => {
      if (prevSelectedProductIds.includes(productId)) {
        return prevSelectedProductIds.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProductIds, productId];
      }
    });
  };

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const actionsColumn = {
    accessorKey: "actions",
    header: "Actions",
    cell: (props) => (
      <ButtonGroup gap="4">
        <Button
          colorScheme="blue"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${props.row.original.id}/edit`);
          }}
          mt="2"
          size="md"
        >
          Edit
        </Button>
        <Button
          colorScheme="blue"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(props.row.original.id);
          }}
          mt="5px"
          size="md"
        >
          Delete
        </Button>
      </ButtonGroup>
    ),
  };

  const columns = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "price", header: "Price" },
    actionsColumn,
  ];

  return (
    <>
      <AddProduct />

      <TableTanstack
        products={products}
        columns={columns}
        navigate={navigate}
      />
    </>
  );
};

export default ProductList;
