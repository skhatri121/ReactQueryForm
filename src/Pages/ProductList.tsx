// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import { fetchProducts, deleteProduct } from "../api/fnc";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import AddProduct from "../Components/AddProduct";
// import CommonTable from "../Components/CommonTable";

// const ProductList = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedProductIds, setSelectedProductIds] = useState([]);
//   const productsPerPage = 5;

//   const {
//     isLoading,
//     isError,
//     data: products,
//     error,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//   });

//   const deleteProductMutation = useMutation({
//     mutationFn: deleteProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//       setSelectedProductIds([]);
//     },
//   });

//   const handleDelete = () => {
//     selectedProductIds.forEach((id) => {
//       deleteProductMutation.mutate(id);
//     });
//   };

//   const handleCheckboxChange = (productId) => {
//     setSelectedProductIds((prevSelectedProductIds) => {
//       if (prevSelectedProductIds.includes(productId)) {
//         return prevSelectedProductIds.filter((id) => id !== productId);
//       } else {
//         return [...prevSelectedProductIds, productId];
//       }
//     });
//   };

//   if (isLoading) return "Loading...";
//   if (isError) return `Error: ${error.message}`;

//   if (!products || products.length === 0) {
//     return <div>No products found.</div>;
//   }

//   const pageCount = Math.ceil(products.length / productsPerPage);

//   const changePage = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const offset = currentPage * productsPerPage;

//   return (
//     <>
//       <AddProduct />

//       <CommonTable
//         products={products.slice(offset, offset + productsPerPage)}
//         selectedProductIds={selectedProductIds}
//         handleCheckboxChange={handleCheckboxChange}
//         navigate={navigate}
//         handleDelete={handleDelete}
//       />

//       <ReactPaginate
//         breakLabel={"..."}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={changePage}
//         containerClassName={"pagination"}
//         activeClassName={"active"}
//       />
//     </>
//   );
// };

// export default ProductList;
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProducts, deleteProduct } from "../api/fnc";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import AddProduct from "../Components/AddProduct";
import CommonTable from "../Components/CommonTable";

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

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * productsPerPage;

  const columns = ["Title", "Description", "Price"];

  return (
    <>
      <AddProduct />

      <CommonTable
        products={products.slice(offset, offset + productsPerPage)}
        columns={columns}
        selectedProductIds={selectedProductIds}
        handleCheckboxChange={handleCheckboxChange}
        navigate={navigate}
        handleDelete={handleDelete}
      />

      <ReactPaginate
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default ProductList;
