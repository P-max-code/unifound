import Item from "./Item";
import "../styles/Items.css";
import { fetchItems } from "../api";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

const ListItems = () => {
  const location = useLocation().pathname.substring(1).toUpperCase();
  const [items, setItems] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setSpinner(true);
    fetchItems(location)
      .then((response) => {
        setItems(response.data.reverse());
        setSpinner(false);
      })
      .catch((error) => {
        console.log("Error in fetching data", error);
        setSpinner(false);
      });
  }, [location]);

  return (
    <div className="container">
      {spinner ? (
        <InfinitySpin width="200" color="#019aff" />
      ) : items.length === 0 ? (
        <h1 className="noItem">No items found</h1>
      ) : (
        items.map((item) => (
          <div key={item._id}>
            <Item key={item._id} data={item} />
          </div>
        ))
      )}
    </div>
  );
};

export default ListItems;
