import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <form
        className="w-full h-full flex justify-center items-center bg-[#e7e7e7] fixed top-0 left-0"
        onSubmit={searchSubmitHandler}
      >
        <input
          type="text"
          placeholder="Search a Product ..."
          className="shadow-[0_0_5px_rgba(0,0,0,0.274)] bg-white border-none text-[rgba(0,0,0,0.637)] py-[0.8vmax] px-[1.5vmax] w-[70%] max-w-[400px] outline-none font-[300] text-[1vmax] font-cursive box-border h-[40px] sm:w-[50%] sm:max-w-[300px]"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
          className="h-[40px] w-[10%] max-w-[100px] rounded-none ml-5 bg-red-500 border-none font-[300] text-[1.5vmax] text-center font-roboto cursor-pointer text-white transition-all duration-500 hover:bg-[#3761d6] sm:w-[20%] sm:max-w-[150px]"
        />
      </form>
    </Fragment>
  );
};

export default Search;
