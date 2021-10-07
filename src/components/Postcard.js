import React from 'react'
import moment from 'moment'
import LikeButton from './LikeButton'

// postindex or index - used to create ids to distinguish buttons and containers inside Postcard to delete or update them easily
function Postcard({ user, postindex, post: { body, createdAt, imageLink, id, username, likeCount, commentCount, comments, likes, userImageLink }}){
    const postModalRef = 'postmodal' + postindex;

    const choosenCardsDisplay = user ? (
        
        <div className="card card_loggedin_display mx-3 my-3" id={'postcard' + postindex}>
            <img src={imageLink} className="card-img-top cursorPointer" data-bs-toggle="modal" data-bs-target={'#'+postModalRef} alt="..."/>

            <div className="card-body">
                <div className='d-flex align-items-center'>
                    <img src={userImageLink} width='50px' height='70px' className="poster_image" alt="..." />
                    <h5 className="card-title ms-3 fw-bold">{username}</h5>
                </div>
                <p className="card-text">{body}</p>
                <small className="card-text">{moment(createdAt).fromNow()}</small>
                
                <div className="d-flex align-items-center">

                    {/* LIKE BUTTON */}
                    <div className='mx-2 mx-md-3'>
                        <LikeButton user={user} post={{id, likes, likeCount}} />
                    </div>

                    {/* COMMENT */}
                    <div className='mx-2 mx-md-3'>
                        {
                            comments && comments.filter((comment) => comment.username === user.username).length ? (
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target={'#'+postModalRef} className="bi bi-chat-fill cursorPointer"></i>
                                    <small className='fw-bold mx-1'>{commentCount}</small>
                                </span>
                            ) : (
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target={'#'+postModalRef} className="bi bi-chat cursorPointer"></i>
                                    <small className='fw-bold mx-1'>{commentCount}</small>
                                </span>
                            )
                        }
                    </div>

                    {/* VIEWS */}
                    <div className='mx-2 mx-md-3'>
                        <span>
                            <i className="bi bi-eye"></i>
                            <small className='fw-bold mx-1'>{(likeCount + commentCount)*2}</small>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        // LOGGED OUT
        <div className="card card_loggedout_display mx-3 my-3 animate__animated animate__pulse animate__slower animate__infinite">
            <img src={imageLink} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <p className="card-text text-truncate">{body}</p>
                <small className="card-text">{moment(createdAt).fromNow()}</small>
                
                <div className="d-flex align-items-center">
                    {/* LIKE BUTTON */}
                    <div className='me-2'>
                        <span>
                            <i className="bi bi-heart"></i>
                            <small className='fw-bold mx-1'>{likeCount}</small>
                        </span>
                    </div>

                    {/* COMMENTS */}
                    <div className='mx-2'>
                        <span>
                            <i className="bi bi-chat"></i>
                            <small className='fw-bold mx-1'>{commentCount}</small>
                        </span>
                    </div>

                    {/* VIEWS */}
                    <div className='ms-2'>
                        <span>
                            <i className="bi bi-eye"></i>
                            <small className='fw-bold mx-1'>{(likeCount + commentCount)*2}</small>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return choosenCardsDisplay;
}
 
export default Postcard;