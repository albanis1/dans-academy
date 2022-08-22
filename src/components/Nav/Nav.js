import React from 'react';
import { useNavigate } from "react-router-dom";
import './Nav.css';
import logo from '../../static/assets/logo.png';
const Nav = (props) => {
    const navigate = useNavigate();
    const { withWishList = false } = props;
    return (
        <div className='containerNav'>
            <div className='navLogo' style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                <img src={logo} alt="logo" width='50px' height='50px' style={{marginRight: '2rem'}}/>
                <h2 style={{marginLeft: 'auto'}}>DAnS Academy</h2>
            </div>
            <div className='navButton'>
                <button style={withWishList ? {marginRight: '2rem'} : {}} onClick={() => navigate('/home')}>Home</button>
                {withWishList ? <button onClick={() => navigate('/wish-list')}>Wish List</button> : ''}
            </div>
        </div>
    )
}

export default Nav