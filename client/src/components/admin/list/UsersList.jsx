import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../../store/usersSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  },[dispatch]);

  const { users } = useSelector((state) => state.usersReducer);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }



  const rows =
    users &&
    users.map((user) => {
      return {
        id: user._id,
        uName: user.name,
        uEmail: user.email,
        isAdmin: user.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "uName", headerName: "Name", width: 150 },
    {
      field: "uEmail",
      headerName: "Email",
      width: 220,
 
    },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
           renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin className="text-warning p-2 rounded bg-light ">Admin</Admin>
            ) : (
              <Customer className="text-info p-2 rounded bg-light "
             
              >Customer</Customer>
            ) }
          </div>
        );
        
      },
    },
    {
      field: "actions",
      headerName: "Acions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (<Actions>
            <Button
              className="btn btn-danger"
              onClick={() => deleteUserHandler(params.row.id)}
            >
              Delete
            </Button>
            <Button
              className="btn btn-success "
              onClick={() => {
                navigate(`/users/${params.row.id}`);
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

const Admin = styled.div`
`;

const Customer = styled.div`
`;
