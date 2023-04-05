import React, { useEffect } from "react";
import { getProducts } from "./../../../store/productsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AllTimeData({ data }) {
    //   const dispatch = useDispatch()
    // useEffect(() => {
    //   dispatch(getProducts())
    // }, [dispatch])

  const { products, isLoading } = useSelector(
    (state) => state.productsReducres  // does not work without dispatch ! //Solved using it in App
  );
  
  return (
    <div className="styled-transactions">
      {isLoading ? (
        <div className="image-preview bitem rounded shadow gap-5 d-flex justify-content-center align-items-center">
          <div
            className="spinner-bitem text-primary m-auto align-self-center"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="transactions bg-dark text-white px-3 py-3 rounded">
          <h3>All Time</h3>
          <table className="table table-striped  table-dark mt-2">
            <tbody>
              <tr className="text-white my-5  rounded">
                <td className="my-table-row   ">Product</td>
                <td className="my-table-row   "> {products.length}</td>
              </tr>
              
              {data?.map((item, idx)=> (
                    
                    <tr key={idx} className="text-white my-5  rounded">
                        <td  className="my-table-row   ">{item.title}</td>
                        <td className="my-table-row   "> {item.digits}</td>
                    </tr>))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
