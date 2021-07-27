import React, { useContext, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../context/auth'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Postcard from '../components/Postcard'
import PostForm from '../components/PostForm'
import loaderGif from '../media/loadergif.gif'
import useForm from '../utilities/customHooks'
import PostModal from '../components/PostModal'
import { FETCH_POSTS_QUERY } from '../utilities/graphqlQueries';

function Home(){
    // QUERY ALL POSTS
    const { loading: getLoading, data } = useQuery(FETCH_POSTS_QUERY);

    // ======================================= REGISTER USERS =======================================
    const registerUserContext = useContext(AuthContext);
    const [ registerErrors, setregisterErrors ] = useState({});
    const { onChange: onChangeRegister, onSubmit: onSubmitRegister, values: registerValues } = useForm(registerUserCallback, { username: '', email: '', profileImageLink: '', password: '', confirmPassword: '' });

    const [ addUser, {loading: putLoading} ] = useMutation(REGISTER_USER, {
        update(_, {data : {register: userRegisterData}}){
            registerUserContext.login(userRegisterData);
            window.location.reload();
        },
        onError(err){
            setregisterErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: registerValues
    });
    
    function registerUserCallback(){ addUser(); }

    // ======================================= LOGIN USERS =======================================
    const loginUserContext = useContext(AuthContext);
    const [ loginErrors, setloginErrors ] = useState({}); 
    const { onChange: onChangeLogin, onSubmit: onSubmitLogin, values: loginValues } = useForm(loginUserCallback, { username: '', password: '' });
    const [ loginUser, {loading: checkLoading} ] = useMutation(LOGIN_USER, {
        update(_, {data : {login: userLoginData}}){
            loginUserContext.login(userLoginData);
            window.location.reload();
        },
        onError(err){
            setloginErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: loginValues
    });
    
    function loginUserCallback(){ loginUser(); }
    
    // alternate between login and register forms display
    function showHideForms(showText, showForm, hideText, hideForm){
        const clickThisText = document.getElementById(showText);
        const showThisForm = document.getElementById(showForm);
        const hideThisText = document.getElementById(hideText);
        const hidethisForm = document.getElementById(hideForm);

        clickThisText.style.color = 'white';
        showThisForm.classList.remove('d-none');

        hideThisText.style.color = 'rgba(255, 255, 255, 0.568)';
        hidethisForm.classList.add('d-none');
    }

    // alternate between (login / register forms) and (posts of the week)
    function showHideLoginvsPosts(e){
        const registerArea = document.getElementById('registerarea');
        const postsOfTheWeek = document.getElementById('posts_of_the_week');

        if(e.target.textContent === 'See the post of the week...'){
            e.target.textContent = 'Login / Register';
            registerArea.classList.add('d-none');
            postsOfTheWeek.classList.replace('d-none', 'd-flex');
        }
        else{
            e.target.textContent = 'See the post of the week...';
            postsOfTheWeek.classList.replace('d-flex', 'd-none');
            registerArea.classList.remove('d-none');
        }
    }

    // displays inputs and errors while registering or loggin in
    function authInputAndErros(inputId, labelText, inputType, name, value, errorInputId, error_type, error_msg_shown, onChangeFunc){
        return ( 
            <>
                <label htmlFor={inputId} className="form-label">{labelText}</label>
                <input type={inputType} className="form-control" name={name} value={value} aria-describedby={errorInputId} onChange={onChangeFunc} id={inputId} />
                {
                    Object.keys(error_type).length > 0 && (
                        <div id={errorInputId} className="form-text auth_errors_color">{error_msg_shown}</div>
                    )
                }
            </>
        );
    }

    // displays related posts 
    function displayRelatedPosts(imgurl, timestamp, poster, snippet){
        return (
            <div className={poster === 'Kevin Michael' ? 'd-flex align-items-center ms-4 ms-md-0' : 'd-flex align-items-center'}>
                <img src={imgurl} width='50px' height='70px' className="poster_image" alt="..." />

                <span className='mx-3 ms-md-3 my-md-4 cursorPointer'>                                            
                    <small className='d-block smallest_texts'>{timestamp}</small>
                    <small className='d-block fw-bold'>{poster}</small>
                    <small className='d-block'>{snippet}</small>
                </span>
            </div>
        )
    }

    const { user } = useContext(AuthContext);
    return (
        <div className='App'>
            <div id="main_container">

                { putLoading || checkLoading ? (<img id='loader_gif' src={loaderGif} width='50px' height='50px' alt="" />) : (<></>) }

                {
                    user && !getLoading ? data.getPosts && data.getPosts.map((post, index) => (
                        <div key={post.id}>
                            <PostModal user={user} dataLength={data.getPosts.length} postindex={index} post={post} />
                        </div>
                                        
                    )) : (<></>)
                }

                { user && ( <PostForm user={user} /> ) }           

                <div id="main_wrapper">
                    <Navbar />
                    {
                        user ? (
                            // LOGGED IN
                            <section className='container-fluid midsection_loggedin_color' id='mid_section'>
                                <div className="row h-100">
                                    {/* to see categories and whos online */}
                                    <div className="col-12 col-md-3 order-md-3" id='categories'>

                                        <div className="my-3 d-flex justify-content-center align-items-center">
                                            {['profilepicOne', 'profilepicTwo', 'profilepicThree'].map((each, index) => (
                                                <div key={index} className={each + ' profile_pics mx-2'}>
                                                    <i className={index === 0 ? "bi bi-check-all" : "bi bi-check-all isOnline"}></i>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='d-flex flex-md-column align-items-center justify-content-md-start align-items-md-end category_text_manipulation fw-bold'>
                                            {['Music', 'Video Games', 'Books', 'Sports', 'Daily life'].map((each, index) => (
                                                <span key={index} className='mx-2 me-md-4 my-md-4 cursorPointer'>
                                                    <small>{each}</small>
                                                    <i className="bi bi-plus"></i>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* related posts */}
                                    <div className="col-12 col-md-3 order-md-1 d-flex flex-md-column align-items-center justify-content-md-start align-items-md-start" id='related_posts'>
                                        <p className='m-0 ms-md-3 mt-md-5 fw-bold'>Related Posts</p>

                                        {displayRelatedPosts('https://images.unsplash.com/photo-1611178206041-54d5e075be45?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80', '1 hour ago', 'Kevin Michael', "I've never heard of...")}

                                        {displayRelatedPosts('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', '2 days ago', 'John Michael', "I thought I could bring...")}
                                        
                                        {displayRelatedPosts('https://images.unsplash.com/photo-1494302377477-915db5a8e609?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', '2 days ago', 'Ale Jordan', "Fifa 22 will be just...")}

                                        {displayRelatedPosts('https://images.unsplash.com/photo-1513712834987-81c201758592?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', '3 days ago', 'Carla Anthony', "Fifa 20 was the...")}
                                    </div>
                                    
                                    {/* current posts */}
                                    <div className="col-12 col-md-6 order-md-2" id='current_posts'>
                                        {
                                            getLoading ? (
                                                <img id='loader_gif' src={loaderGif} width='50px' height='50px' alt="" />
                                            ) : 
                                                data.getPosts && data.getPosts.map((post, index) => (
                                                <div className='mt-3 mx-auto animate__animated animate__fadeIn' key={post.id}>
                                                    <Postcard user={user} postindex={index} post={post} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </section>
                        ) 
                        : (
                            // LOGGED OUT 
                            <section className='container d-flex flex-column justify-content-center align-items-center flex-lg-row justify-content-lg-between' id='mid_section'>
                                <div className='mx-3 me-md-5 mt-3'>
                                    {
                                        window.matchMedia("(min-width: 768px)").matches ? (<h1 className='home_messages'>Register and find out more about <span className='site_title'>BF Media</span>.</h1>) :
                                        (<h5 className='home_messages'>Welcome to <span className='site_title'>BF Media</span></h5>)
                                    }
                                    <p onClick={showHideLoginvsPosts} className='d-inline-block cursorPointer mt-0 home_messages'>See the post of the week...</p>
                                </div>

                                <div className='my-2 mx-md-5 glass p-4 p-md-5' id='registerarea'>
                                    <h6 className='text-center my-4 fw-bold'>
                                        <span onClick={() => {showHideForms('login_text', 'login_form', 'register_text', 'register_form')}} className='cursorPointer' id='login_text'>Login</span> / 
                                        <span onClick={() => {showHideForms('register_text', 'register_form', 'login_text', 'login_form')}} className='cursorPointer' id='register_text'> Register</span>
                                    </h6>

                                    {/* LOGIN FORM */}
                                    <form onSubmit={onSubmitLogin} id='login_form' noValidate>
                                        <div className="mb-3">
                                            {authInputAndErros('loginUsernameInput', 'Username', 'text', 'username', loginValues.username, 'login_username_error', loginErrors, loginErrors.username, onChangeLogin)}
                                        </div>

                                        <div className="mb-3">
                                            {authInputAndErros('loginPasswordInput', 'Password', 'password', 'password', loginValues.password, 'login_password_error', loginErrors, loginErrors.password, onChangeLogin)}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </form>

                                    {/* REGISTER FORM */}
                                    <form onSubmit={onSubmitRegister} className='d-none' id='register_form' noValidate>
                                        {/* USERNAME */}
                                        <div className="mb-3">
                                            {authInputAndErros('registerUsernameInput', 'Username', 'text', 'username', registerValues.username, 'register_username_error', registerErrors, registerErrors.username, onChangeRegister)}
                                        </div>

                                        {/* EMAIL */}
                                        <div className="mb-3">
                                            {authInputAndErros('registerEmailInput', 'Email', 'email', 'email', registerValues.email, 'register_email_error', registerErrors, registerErrors.email, onChangeRegister)}
                                        </div>

                                        {/* PROFILE IMAGE LINK */}
                                        <div className="mb-3">
                                            {authInputAndErros('registerPhotoLinkInput', 'Profile photo link', 'text', 'profileImageLink', registerValues.profileImageLink, 'register_photo_error', registerErrors, registerErrors.profileImageLink, onChangeRegister)}
                                        </div>

                                        {/* PASSWORD */}
                                        <div className="mb-3">
                                            {authInputAndErros('registerPasswordInput', 'Password', 'password', 'password', registerValues.password, 'register_password_error', registerErrors, registerErrors.password, onChangeRegister)}
                                        </div>

                                        {/* CONFIRM PASSWORD */}
                                        <div className="mb-3">
                                            {authInputAndErros('confirmPasswordInput', 'Confirm Password', 'password', 'confirmPassword', registerValues.confirmPassword, 'register_confirmPassword_error', registerErrors, registerErrors.confirmPassword, onChangeRegister)}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </form>
                                </div>

                                <div className="d-none my-3 mx-md-5 glass" id='posts_of_the_week'>
                                    {
                                        !getLoading && data.getPosts ? (
                                            <Postcard post={data.getPosts.sort(function(a, b){ return b.likes.length - a.likes.length })[0]} />
                                        ) 
                                            : 
                                        (
                                            <img id='loader_gif' src={loaderGif} width='50px' height='50px' alt="" />
                                        )
                                    }
                                </div>
                            </section>
                        )
                    }
                </div>

            </div>

            <Footer />
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $profileImageLink: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                profileImageLink: $profileImageLink
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id
            email
            username
            profileImageLink
            createdAt
            token
        }
    }
`;

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            id
            email
            username
            profileImageLink
            createdAt
            token
        }
    }
`;
export default Home;