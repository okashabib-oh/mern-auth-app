import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token')
        handleSuccess("Logged out successfully")

        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const fetchProducts = async () => {
        try {

            const url = "http://localhost:8080/products"
            const res = await fetch(url,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                }
            )
            const data = await res.json()
            setProducts(data)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
        fetchProducts()
    }, [])

    return (
        <div>
            <h1 style={{
                color: 'GrayText',
                textDecoration: 'underline',
                textDecorationStyle: 'double'
            }}>Welcome {loggedInUser}</h1>
            <button className='logout' onClick={() => handleLogout()}>Logout</button>
            <h2>Products</h2>
            {products?.map((p, i) => (
                <div className='products' key={i}>
                    <h3>{p.name}</h3>
                    <p>Price: {p.price}</p>
                </div>
            ))}
            <ToastContainer />
        </div>
    )
}

export default Home