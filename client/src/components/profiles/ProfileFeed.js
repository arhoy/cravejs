import React from 'react';
import ProfileItem from './ProfileItem';

const ProfileFeed = ({comments,showActions,backgroundColor}) => (

        comments.map(comment => {
                return (
                    <ProfileItem key = {comment._id} backgroundColor = {backgroundColor} comment = {comment} showActions = {showActions} />
                )
            }
        )
)



export default ProfileFeed;