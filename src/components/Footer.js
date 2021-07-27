
import React, { useContext }  from 'react';
import { AuthContext } from '../context/auth'

function Footer(){

    const { user } = useContext(AuthContext);
    const footerReturn = user ? (
        <footer className='d-flex justify-content-center align-items-center footer_backgd_loggedin'>
            <small className="copyright_year">
                <a href="http://bfmarketing.net/" target="_blank" rel="noopener noreferrer">
                    &copy; Made by BF Marketing <i className="ms-2 bi bi-box-arrow-up-right"></i>
                </a>
            </small>
        </footer>
    ) 
    : (
        <footer className='d-flex justify-content-center align-items-center'>
            <small className="copyright_year">
                <a href="http://bfmarketing.net/" target="_blank" rel="noopener noreferrer">
                    &copy; Made by BF Marketing <i className="ms-2 bi bi-box-arrow-up-right"></i>
                </a>
            </small>
        </footer>
    );

    return footerReturn;
}
 
export default Footer;