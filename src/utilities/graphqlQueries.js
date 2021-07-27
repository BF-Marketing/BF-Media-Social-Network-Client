import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            imageLink
            userImageLink
            createdAt
            username
            likeCount
            commentCount
            comments{
                id
                body
                createdAt
                username
                userCommentPhoto
            }
            likes{
                id
                createdAt
                username
            }
        }
    }
`;