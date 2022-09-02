import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    let navigate = useNavigate();

    const handleSubmit = async e => {
        if(props.loggedIn){
        e.preventDefault();

        let title = e.target.title.value;
        let post = e.target.post.value;
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        myHeaders.append('Content-Type', 'application/json')

        let response = await fetch('http://localhost:5000/api/posts', {
            method:'POST',
            headers:myHeaders,
            body:JSON.stringify({title:title, body:post})
        })
        if (response.ok){
            let data = await response.json();

            props.flashMessage(`You have created ${title} successfully `, 'success');
            navigate('/');
        } else 
            props.flashMessage('Something went wrong !', 'danger');
    }
    else 
        props.flashMessage('Login is required !', 'danger');
    }

    return (
        <>
            <h4 className="text-center">New Post</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Title">Title</label>
                    <input type='text' className='form-control' placeholder='Title' name='title' />
                    
                    <label htmlFor="Post">Post</label>
                    <input type='taxt' className='form-control' placeholder='Post' name='post' />
                    
                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Submit' />
                </div>
            </form>
        </>
    )
}