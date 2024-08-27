import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="bg-white flex flex-col py-16">
      <Link to="/" className="p-0">
        <img src={logo} alt="Ecommerce" className="w-full transition-all duration-500 hover:drop-shadow-[0_0_10px_tomato]" />
      </Link>
      <Link to="/admin/dashboard" className="no-underline text-[rgba(0,0,0,0.493)] font-light text-base p-8 transition-all duration-500 hover:text-tomato hover:scale-110">
        <p className="flex items-center">
          <DashboardIcon className="mr-2" /> Dashboard
        </p>
      </Link>
      <Link className="no-underline text-[rgba(0,0,0,0.493)] font-light text-base p-8 transition-all duration-500 hover:text-tomato hover:scale-110">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders" className="no-underline text-[rgba(0,0,0,0.493)] font-light text-base p-8 transition-all duration-500 hover:text-tomato hover:scale-110">
        <p className="flex items-center">
          <ListAltIcon className="mr-2" /> Orders
        </p>
      </Link>
      <Link to="/admin/users" className="no-underline text-[rgba(0,0,0,0.493)] font-light text-base p-8 transition-all duration-500 hover:text-tomato hover:scale-110">
        <p className="flex items-center">
          <PeopleIcon className="mr-2" /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className="no-underline text-[rgba(0,0,0,0.493)] font-light text-base p-8 transition-all duration-500 hover:text-tomato hover:scale-110">
        <p className="flex items-center">
          <RateReviewIcon className="mr-2" /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
