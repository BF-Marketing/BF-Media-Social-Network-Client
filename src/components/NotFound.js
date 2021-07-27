
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(){
    return (
        <div className="not_found px-3 text-white text-center fw-bold d-flex flex-column justify-content-center align=items-center">
            <i className="bi bi-emoji-frown"></i>
            <h1>Sorry, the page you're looking for doesn't exist.</h1>
            <p><Link to='/'>Click here</Link> to go to the main page.</p>
        </div>
    );
}
 
export default NotFound;