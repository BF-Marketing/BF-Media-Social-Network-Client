import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../utilities/graphqlQueries';

function DeleteComment( { postId, commentId } ){
    const [ deleteComment ] = useMutation(DELETE_COMMENT_MUTATION, {
        update(){},
        variables: {
            postId,
            commentId
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }]
    });

    function toggleDeleteCommentBtn(arg){ document.getElementById(arg).classList.toggle('invisible'); }

    return(
        <>        
            <button onClick={deleteComment} type="button" className="invisible btn btn-sm btn-danger me-3" id={commentId}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                </svg>
            </button>
            <i className="bi bi-three-dots cursorPointer" onClick={() => { toggleDeleteCommentBtn(commentId) }}></i>
        </>
    );
}

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
        comments {
            id
            username
            createdAt
            body
            userCommentPhoto
        }
        commentCount
    }
}
`;

export default DeleteComment;