import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth'

function Navbar(){
    const { user, logout } = useContext(AuthContext);

    const userPicWrapper = document.getElementById('userpic_wrapper');
    if(user && userPicWrapper){
        userPicWrapper.style.backgroundImage = `url(${user.profileImageLink})`;
        userPicWrapper.style.backgroundPosition = 'top';
        userPicWrapper.style.backgroundRepeat = 'no-repeat';
        userPicWrapper.style.backgroundSize = 'cover';
    }
    
    const chosenNavbar = user ? (
        <header>
            <nav className="navbar navbar-expand-md navbar-light navbar_loggedin_backgd">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3 ms-md-5" to="/">
                        <img src="/logo.png" alt="Website logo" width="40" height="40" className="d-inline-block align-text-top" id='sitelogo' />
                    </Link>

                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-3 ms-md-5">
                            
                            <div className='profile_pics mx-md-3 my-1 my-md-0' data-bs-toggle="tooltip" data-bs-placement="top" title={user.username} id='userpic_wrapper'>
                                <i className="bi bi-check-all isOnline"></i>
                            </div>

                            <i className="bi bi-plus-square-fill navSquarePlus nav-link mx-md-3 my-1 my-md-0 cursorPointer" data-bs-toggle="modal" data-bs-target='#postFormModal'></i>

                            <i className="bi bi-box-arrow-right nav-link mx-md-3 my-1 my-md-0 cursorPointer" data-bs-toggle="tooltip" data-bs-placement="top" title='Logout' onClick={logout}></i>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    ) 
    : (
        <header>
            <nav className="navbar navbar-expand-md navbar-light navbar_loggedout_backgd">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3 ms-md-5" to="/">
                        <img src="/logo.png" alt="Website logo" width="40" height="40" className="d-inline-block align-text-top" id='sitelogo' />
                    </Link>

                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-3 ms-md-5">
                            <Link className="bi bi-house-fill nav-link active mx-md-3 my-1 my-md-0" aria-current="page" to='/'>
                                <span className='ms-2 home_text'>Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );

    return chosenNavbar;
}
 
export default Navbar;