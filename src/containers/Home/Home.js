import React, { useState, useEffect } from 'react'
import Nav from '../../components/Nav/Nav';
import './Home.css';
import { get } from 'lodash';
const Home = () => {
    useEffect(() => {
        fetchItems();
    }, []);
    const [item, setItem] = useState([]);
    const fetchItems = async () => {
        const data = await fetch(
            'https://fortnite-api.com/v2/shop/br'
        );
        const response = await data.json();
        const itemResult = get(response, 'data.daily.entries[0].items', []);
        setItem(itemResult);
    }
  return (
    <div className='container'>
        <Nav withWishList/>
        <div className='borderHome'>
        <h2><u>Home</u></h2>
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
            }) : ''}
        </table>
        </div>
    </div>
  )
}

export default Home