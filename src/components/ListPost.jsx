import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [data, setData] = useState([]);
    useEffect(() => {
        if(props.loggedIn){


        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

        fetch('http://localhost:5000/api/posts', {
            headers:myHeaders,
        })
        .then(res => res.json())
        .then(post => setData(post))
    }
    else 
        props.flashMessage('Login is required !', 'danger');
    },
    [])
    let tableHeaders = ['Title', 'Body']
    return (
        <>
            <h4 className="text-center">Current Posts</h4>
            
            <table className='table table-primary table-striped mt-3'>
                <thead>
                    <tr>
                        {tableHeaders.map((th, i) => <th key={i}>{th}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((post, idx) => {   
                        return (<tr key={idx}>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </>
    )
}