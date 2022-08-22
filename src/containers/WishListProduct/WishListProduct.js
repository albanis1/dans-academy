import React, { useState, useEffect } from 'react'
import Nav from '../../components/Nav/Nav';
import './WishListProduct.css';
import { get, isEmpty } from 'lodash';
const WishListProduct = () => {
    useEffect(() => {
        fetchItems();
    }, []);
    const [item, setItem] = useState([]);
    const fetchItems = async () => {
        const productWishList = JSON.parse(localStorage.getItem("wishList")) || [];
        if (isEmpty(productWishList)) {
            setItem([]);
        } else {
            const data = await fetch(
                'https://fortnite-api.com/v2/shop/br'
            );
            const response = await data.json();
            const itemResult = get(response, 'data.daily.entries[0].items', []);
            const finalResult = [];
            for (const itemWishList of productWishList) {
                const dataItem = itemResult.filter((item) => item.id === itemWishList);
                if (!isEmpty(dataItem)) finalResult.push(dataItem[0]);
            }
            setItem(finalResult);
        }
    }
  return (
    <div className='container'>
        <Nav withWishList/>
        <div className='borderHome'>
        <h2><u>Wishlist</u></h2>
        <table>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Actions</th>
            </tr>
            {item.length > 0 ? item.map((item) => {
                return (
                    <tr>
                        <td>{get(item, 'name', 'Name Product')}</td>
                        <td>{get(item, 'description', 'Description Product')}</td>
                        <td style={{color: 'blue'}}><u><a href={`/detail/${get(item, 'id')}`}>View</a></u></td>
                    </tr>
                )
            }) :
                <tr>
                    <td colSpan={9}>No Data Found</td>
                </tr>
            }
        </table>
        </div>
    </div>
  )
}

export default WishListProduct