
import React from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import useForm from '../utilities/customHooks'
import { FETCH_POSTS_QUERY } from '../utilities/graphqlQueries';

function PostForm(props){   
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '',
        imageLink: '',
        userImageLink: props.user.profileImageLink
    });   

    const [ createPost, { error } ] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(){
            values.body = ''
            values.imageLink = ''
            values.userImageLink = ''
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }]
    });

    function createPostCallback(){ createPost(); }

    return(       
        <div className="modal fade" id="postFormModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabel">Create a post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div id='post_form_wrapper'>

                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="imageURLInput" className="form-label">Post image URL</label>
                                    <input type="text" className="form-control" id="imageURLInput" onChange={onChange} name='imageLink' value={values.imageLink} aria-describedby="post_imageurl_error" />
                                </div>
                                            
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" onChange={onChange} name='body' value={values.body} placeholder="Write your post here" id="floatingTextarea"></textarea>
                                    <label htmlFor="floatingTextarea">Post</label>
                                </div>
                                
                                {error && (
                                    <div id="imageHelp" className="form-text mb-2 post_publish_error">{error.graphQLErrors[0].message}</div>
                                )}
                                <button type="submit" className="btn btn-primary">Post</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost( $body: String! $imageLink: String! $userImageLink: String!){
        createPost( body: $body, imageLink: $imageLink, userImageLink: $userImageLink ){
            id
            body
            username
            createdAt
            imageLink
            userImageLink
            likeCount
            commentCount
            likes{
                id
                username
                createdAt
            }
            comments{
                id
                body
                username
                userCommentPhoto
                createdAt
            }
        }
    }
`;

export default PostForm;