/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import "./CheckOutProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import Select from "react-select";
import { COURIER, PAYMENT_METHOD } from '../../static';

const CheckOutProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const idProduct = get(params, "id", null);
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState([]);
  const [jumlah, setJumlah] = useState(0);
  const [selectedCourier, setSelectedCourier] = useState('JNE');
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null);

  const fetchItems = async () => {
    const data = await fetch("https://fortnite-api.com/v2/shop/br");
    const response = await data.json();
    const itemResult = get(response, "data.daily.entries[0].items", []);
    const filteredItem = !isEmpty(itemResult)
      ? itemResult.filter((item) => item.id === idProduct)
      : [];
    if (isEmpty(filteredItem)) {
      alert("item not found");
      navigate("home");
    }
    setItem(filteredItem);
  };

  const handleChangeNumber = (e) => {
    const numberValue = Number(e.target.value);
    if (numberValue > 0) setJumlah(numberValue);
  }

  return (
    <div className="container">
      <Nav />
      <div className="borderHome">
        <h2>
          <u>Order</u>
        </h2>

        <div className="flex">
          <span>Kurir</span>
          <div style={{ marginLeft: "2rem", width: "200px" }}>
            <Select
              options={COURIER}
              placeholder={"Select"}
              onChange={(e) => setSelectedCourier(e.value)}
            />
          </div>
        </div>

        <div className="flex">
          <span>Jumlah</span>
          <div style={{ marginLeft: ".9rem", width: "200px" }}>
            <input className="inputNumber" type="number" value={jumlah} onChange={(e) => handleChangeNumber(e)} />
          </div>
        </div>

        <div className="flex">
          <span>Harga Barang</span>
          <span style={{ marginLeft: "2rem", marginRight: "5rem" }}>xxxx</span>
          <span>Potongan/Diskon</span>
          <span style={{ marginLeft: "2rem" }}>xxxx</span>
        </div>

        <div className="flex">
          <span>Metode Pembayaran</span>
          <div style={{ marginLeft: "2rem", width: "200px" }}>
            <Select
              options={PAYMENT_METHOD}
            placeholder={"test"}
              onChange={(e) => setselectedPaymentMethod(e.value)}
            />
          </div>
        </div>

        <div className="flex">
          <span>Ongkir</span>
          <span style={{ marginLeft: "2rem" }}>xxxx</span>
        </div>

        <div className="flex">
          <span>
            <u>
              <strong>Harga Akhir</strong>
            </u>
          </span>
          <span style={{ marginLeft: "2rem" }}>xxxx</span>
        </div>
        <hr/>
        <button style={{padding: '5px', width: '10rem'}}>Bayar</button>
      </div>
    </div>
  );
};

export default CheckOutProduct;
