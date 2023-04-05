import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteProducts } from "../../../store/productsSlice";
import EditProduct from "../../EditProduct";

export default function ProductsList() {
  const { products } = useSelector((state) => state.productsReducres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteProductHandler = (id) => {
    dispatch(deleteProducts(id));
  };

  const rows =
    products &&
    products.map((product) => {
      return {
        id: product._id,
        imageUrl: product.image.url,
        pName: product.name,
        pDesc: product.desc,
        price: product.price.toLocaleString(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Acions",
      sortable: false,
      width: 270,
      renderCell: (params) => {
        return (
          <Actions className="">
            <Button
              className="btn btn-danger"
              onClick={() => deleteProductHandler(params.row.id)}
            >
              Delete
            </Button>
            <EditProduct productId ={params.row.id}/>
            <Button
              className="btn btn-success "
              onClick={() => {
                navigate(`/products/${params.row.id}`);
              }}
            >
              View
            </Button>
          </Actions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// "@emotion/react": "^11.10.6",
// "@emotion/styled": "^11.10.6",
// "@mui/material": "^5.11.16",
