import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAllReviews,
  deleteReviews,
} from "../../Actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../Constants/ProductConstant";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReviews
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.GetReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.id
          ? "text-green-600"
          : "text-red-600";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => deleteReviewHandler(params.row.id)}>
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] flex-grow w-full">
        <SideBar />
        <div className="flex p-8 bg-gray-100 min-h-screen justify-center">
          <form
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-4 justify-center">
              ALL REVIEWS
            </h1>

            <div className="flex items-center mb-4">
              <Star className="text-yellow-500" />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="ml-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={loading || productId === ""}
            >
              Search
            </Button>
          </form>
         </div>
          {reviews && reviews.length > 0 ? (
            <div className="mt-8">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="bg-white rounded-lg shadow-md"
                autoHeight
              />
            </div>
          ) : (
            <h1 className="text-xl font-bold text-gray-800 mt-8">
              No Reviews Found
            </h1>
          )}
        </div>
      </div>
      
    </>
  );
};

export default ProductReviews;
