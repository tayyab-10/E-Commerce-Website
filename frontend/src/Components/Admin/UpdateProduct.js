import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct } from "../../Actions/AdminAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../Constants/ProductConstant";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../../Actions/productAction";
import { Button } from "@mui/material";
import Loader from "../Loader/Loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const { error, product, loading: productLoading } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updatedeleteproduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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

  const productId = id;

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setCategory(product.category || "");
      setStock(product.Stock || 0);
      setOldImages(product.images || []);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Product" />
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] flex-grow w-full">
          <SideBar />
          <>
          {productLoading ? (<Loader/>):
          (
            <div className="flex items-center justify-center">
            <form
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Update Product
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
                  value={price}
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
                  value={category}
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
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div className="flex space-x-2 mb-4">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                      className="w-12 h-12 rounded"
                    />
                  ))}
              </div>

              <div className="flex space-x-2 mb-4">
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
                disabled={updateLoading ? true : false}
                className="w-full bg-tomato text-white py-2 rounded hover:bg-red-600 transition-all"
              >
                Update
              </Button>
            </form>
          </div>
    )}
    </>
        </div>
      </div>
    </>
         
  );
};

export default UpdateProduct;
