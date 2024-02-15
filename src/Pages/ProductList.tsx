import { useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import AddProduct from "../Components/AddProduct";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProducts, deleteProduct } from "../api/fnc";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ProductList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const productsPerPage = 5;

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

  const handleDelete = () => {
    selectedProductIds.forEach((id) => {
      deleteProductMutation.mutate(id);
    });
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

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * productsPerPage;

  return (
    <>
      <AddProduct />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Product Title</Th>
              <Th>Description</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.slice(offset, offset + productsPerPage).map((product) => (
              <Tr key={product.id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </Td>
                <Td
                  cursor="pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.title}
                </Td>
                <Td
                  cursor="pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.description}
                </Td>
                <Td
                  isNumeric
                  cursor="pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  $ {product.price}
                </Td>
                <Td>
                  <Button
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    mt="2"
                    bg="primary.51"
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={selectedProductIds.length === 0}
                    onClick={handleDelete}
                    mt="5px"
                    bg="primary.54"
                    color="primary.59"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <ReactPaginate
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={changePage}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </TableContainer>
    </>
  );
};

export default ProductList;
