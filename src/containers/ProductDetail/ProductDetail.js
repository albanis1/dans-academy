import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import "./ProductDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const idProduct = get(params, "id", null);
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState([]);
  const fetchItems = async () => {
    const data = await fetch("https://fortnite-api.com/v2/shop/br");
    const response = await data.json();
    const itemResult = get(response, "data.daily.entries[0].items", []);
    const filteredItem = !isEmpty(itemResult)
      ? itemResult.filter((item) => item.id === idProduct)
      : [];
    if (isEmpty(filteredItem)) {
      alert("item not found");
      navigate("/home");
    }
    setItem(filteredItem);
  };

  const saveWishList = () => {
    const productWishList = JSON.parse(localStorage.getItem('wishList')) || [];
    if (!isEmpty(productWishList)) {
        const isDuplicate = productWishList.filter((item) => item === idProduct);
        if (!isDuplicate) productWishList.push(idProduct);
    } else {
        productWishList.push(idProduct);
    }
    localStorage.setItem('wishList', JSON.stringify(productWishList));
  }

  return (
    <div className="container">
      <Nav />
      <div className="borderHome">
        <h2>
          <u>Detail {get(item, "[0]name")}</u>
        </h2>
        <div style={{ display: "flex" }}>
          <div>
            <h2>Spesifikasi Barang</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>Deskripsi Barang</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>Action</h2>
            <div>
              <button style={{ padding: "5px" }} onClick={() => navigate(`/checkout/${idProduct}`)}>Order</button>
              <button style={{ marginLeft: "2rem", padding: "5px" }} onClick={saveWishList}>
                Add to with list
              </button>
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <img
              alt={idProduct}
              style={{ height: "300px" }}
              src={get(item, 'images.icon', 'https://fortnite-api.com/images/cosmetics/br/bid_417_bonesnake/icon.png')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
