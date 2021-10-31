import React from 'react'

const Comment = ({comment}) => {
    return (
        <div className="w-full border-b p-2 border-black">
            <h1 className="text-xl sm:text-2xl pb-3">{comment.username} said :</h1>
            <p className="sm:text-xl">{comment.comment}</p>
        </div>
    )
}

export default Comment
