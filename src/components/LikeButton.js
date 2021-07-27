
import React, { useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


function LikeButton({user, post: {id, likes, likeCount} }){

    const [liked, setLiked] = useState(false);
    const newLike = useRef(likeCount);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        }
        else{
            setLiked(false);
        } 
    }, [user, likes]);

    const [ likePost ] = useMutation(LIKE_POST_MUTATION, { variables: { postId: id }});

    function likePostAction(){
        likePost();
        newLike.current = newLike.current + 1;
        setLiked(true);
    }

    const likeButton = user ? (
        liked ? (
            <span>
                <i className="bi bi-heart-fill cursorPointer"></i>
                <small className='fw-bold mx-1'>{newLike.current}</small>
            </span>
        ) : (
            <span>
                <i onClick={likePostAction} className="bi bi-heart cursorPointer"></i>
                <small className='fw-bold mx-1'>{likeCount}</small>
            </span>
        )
    ) : (
        <></>
    );

    return likeButton;
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;