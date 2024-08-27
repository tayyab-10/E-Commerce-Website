import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../Actions/AdminAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../Constants/ProductConstant";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] flex-grow w-full">
          <SideBar />
          <div className="flex items-center justify-center">
            <form
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Product
              </h1>

              <div className="mb-4 relative">
                <SpellcheckIcon className="absolute left-3 top-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div className="mb-4 relative">
                <AttachMoneyIcon className="absolute left-3 top-2 text-gray-500" />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div className="mb-4 relative">
                <DescriptionIcon className="absolute left-3 top-2 text-gray-500" />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                  cols="30"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4 relative">
                <AccountTreeIcon className="absolute left-3 top-2 text-gray-500" />
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 relative">
                <StorageIcon className="absolute left-3 top-2 text-gray-500" />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div className="mb-4" id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div className="flex space-x-2 mb-4" id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="w-12 h-12 rounded"
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-tomato text-white py-2 rounded hover:bg-red-600 transition-all"
              >
                Create
              </Button>
            </form>
          </div>
        </div>
    </div>
    </>
  );
};

export default NewProduct;
