import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { editorders, getOrders } from "../../../store/orderSlice";
import moment from "moment";

export default function OrdersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  },[]);

  const { orders } = useSelector((state) => state.OrdersReducer);

  const dispatchOrderHandler = (id) => {

    dispatch(editorders({
      id,
      delivery_status: "dispatched",
    }))
  }


  const deliverOrderHandler = (id) => {
    dispatch(editorders({
      id,
      delivery_status: "delivered",
    }))
  }

  const rows =
    orders &&
    orders.map((order) => {
      return {
        id: order._id,
        cName: order.shipping.name,
        amount: (order.total / 100)?.toLocaleString(),
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "cName", headerName: "Name", width: 120 },
    {
      field: "amount",
      headerName: "Amount($)",
      width: 100,
    },
    {
      field: "dStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending className="text-warning p-2 rounded bg-light ">Pending</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched className="text-info p-2 rounded bg-light "
             
              >Dispatched</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered className="text-success p-2 rounded bg-light "
              >Delivered</Delivered>
            ): (
              "error"
            )}
          </div>
        );
        
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Acions",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (<Actions>
            <Button
              className="btn btn-info"
              onClick={() => dispatchOrderHandler(params.row.id)}
            >
              Dispatch
            </Button>
            <Button
              className="btn btn-primary"
              
              onClick={() => deliverOrderHandler(params.row.id)}
            >
              Deliver
            </Button>
            <Button
              className="btn btn-success "
              onClick={() => {
                navigate(`/orders/${params.row.id}`);
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

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Pending = styled.div`
`;

const Dispatched = styled.div`
`;

const Delivered = styled.div`
`;
