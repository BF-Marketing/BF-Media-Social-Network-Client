import React, { useState } from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'

import { FETCH_POSTS_QUERY } from '../utilities/graphqlQueries';
import DeleteComment from './DeleteComment'
import DeletePost from './DeletePost'

// modals are creted for each Postcard
function PostModal({ user, dataLength, postindex, post: { id, username, body, imageLink, comments, userImageLink }}){

    const postId = id;
    const postModalId = 'postmodal' + postindex;
    const nextPostModal = '#postmodal' + (postindex + 1);
    const previousPostModal = postindex >= 1 ? '#postmodal' + (postindex - 1) : false;

    let postMarkup;
    const fadeOnlyFirstModel = postindex === 0 ? "modal fade" : "modal";
    const [comment, setComment] = useState('');

    const [ submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
        },
        variables: {
            postId,
            body: comment,
            userCommentPhoto: user.profileImageLink
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }]
    });

    // adds comment to the database and front page
    function submitAndDisplay(e){
        e.preventDefault();
        submitComment();
    }

    function showHideCommentform(){
        const commentTextarea = document.querySelectorAll('.textareaAndbtn');
        commentTextarea.forEach( each => { if(each){ each.classList.toggle('d-none'); } })
    }

    postMarkup = (
        <div className={fadeOnlyFirstModel} id={postModalId} aria-hidden="true" aria-labelledby="postModalExpanded" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">                        
                    <div className="modal-body p-0">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-12 col-md-8 p-0" id='postExpandedImage'>
                                    {/* EXPANDED POSTCARD IMAGE ON TOP (MOBILE) OR LEFT(DESKTOP) */}
                                    {/* shows delete post icon (trash can) */}
                                    { user.username === username && (<DeletePost postId={id} />) }

                                    {/* shows x icon to close the modal */}
                                    { window.matchMedia("(min-width: 768px)").matches ? <></> : 
                                        (<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='closePostModal'></button>) }

                                    {
                                        // shows left and right arrows on devices bigger than mobiles only
                                        !window.matchMedia("(min-width: 768px)").matches ? 
                                        <></> : 
                                        (
                                            <div className="previous_next_arrows">                        
                                                {
                                                    postindex > 0  ? <i data-bs-target={previousPostModal} data-bs-toggle="modal" data-bs-dismiss="modal" className="bi bi-arrow-left-square-fill me-5 cursorPointer"></i>
                                                    : <></>
                                                }

                                                {
                                                    postindex >= 0 && dataLength !== postindex+1 ? <i data-bs-target={nextPostModal} data-bs-toggle="modal" data-bs-dismiss="modal" className="bi bi-arrow-right-square-fill cursorPointer"></i>
                                                    : <></>
                                                }
                                            </div>
                                        )
                                    }
                                    
                                    <img src={imageLink} width='100%' height='100%' alt="..."/>
                                </div>

                                {/* COMMENTS ON BOTTOM (MOBILE) OR RIGHT (DESKTOP) */}
                                <div className="col-12 col-md-4" id='postExpandedComments'>
                                    <div className='mt-3'>
                                        <div className='d-flex align-items-center'>
                                            <img src={userImageLink} width='50px' height='70px' className="poster_image" alt="..." />
                                            <span>
                                                <h5 className="ms-3 my-0 fw-bold">{username}</h5>                                               
                                                <small className='ms-3 smallest_texts'>{moment(comment.createdAt).fromNow()}</small> 
                                            </span>
                                        </div>
                                        <p className="mt-2 expandedPostBody">{body}</p>
                                    </div>

                                    {/* COMMENT FORM */}
                                    <div className='mt-3 mb-1' id='comment_form_wrapper'>
                                        <form>
                                            <div className='d-flex justify-content-center align-items-center mb-0'>
                                                <small>Add a comment</small>
                                                <i onClick={showHideCommentform} className="bi bi-plus-square-fill commentSquarePlus cursorPointer ms-2"></i>
                                            </div>                                                                 
                                            <div className="d-none form-floating mb-3 textareaAndbtn">
                                                <textarea className="form-control" onChange={(e) => setComment(e.target.value)} name='comment' value={comment} id="floatingTextarea"></textarea>
                                                <label htmlFor="floatingTextarea">Comment</label>
                                            </div>

                                            <button type="submit" className="d-none btn btn-primary btn-sm textareaAndbtn" disabled={comment.trim() === ''} onClick={submitAndDisplay}>Submit</button>
                                        </form>
                                    </div>

                                    {/* DISPLAY COMMENTS */}
                                    {comments.map((comment) => (
                                        <div className='container mb-2 comment_container' key={comment.id}>
                                            <div className='d-flex justify-content-end'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    {user.username === comment.username && (
                                                        <DeleteComment postId={id} commentId={comment.id} />
                                                    )}
                                                </div>
                                            </div>

                                            <div className='d-flex align-items-center mb-0'>
                                                <img src={comment.userCommentPhoto} width='50px' height='70px' className="poster_image" alt="..." />
                                                <p className='ms-3 my-0 fw-bold'>{comment.username}</p>                                             
                                            </div>
                                            <small className='mt-0 smallest_texts'>{moment(comment.createdAt).fromNow()}</small>
                                            <p className='my-2'>{comment.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        // shows left and right arrows on mobiles only
                        window.matchMedia("(min-width: 768px)").matches ? 
                        <></> : 
                        (
                            <div className="modal-footer p-0 m-auto">                        
                                {
                                    postindex > 0  ? <i data-bs-target={previousPostModal} data-bs-toggle="modal" data-bs-dismiss="modal" className="bi bi-arrow-left-square-fill me-5 cursorPointer"></i>
                                    : <></>
                                }

                                {
                                    postindex >= 0 && dataLength !== postindex+1 ? <i data-bs-target={nextPostModal} data-bs-toggle="modal" data-bs-dismiss="modal" className="bi bi-arrow-right-square-fill ms-5 cursorPointer"></i>
                                    : <></>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>         
    );

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!, $userCommentPhoto: String!) {
        createComment(postId: $postId, body: $body, userCommentPhoto: $userCommentPhoto) {
            id
            comments {
                id
                body
                createdAt
                username
                userCommentPhoto
            }
            commentCount
        }
    }
`;

export default PostModal;