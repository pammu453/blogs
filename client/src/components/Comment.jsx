import { useEffect, useState } from 'react'
import moment from 'moment';
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Textarea, Button } from 'flowbite-react';

const Comment = ({ comment, onLike, onEdit }) => {
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [comment])

    const handleEdit = () => {
        setEditing(true)
        setEditedContent(comment.content)
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: { "Content-Type": 'application/json' },
                credentials: "include",
                body: JSON.stringify({
                    content: editedContent
                })
            })
            if (res.ok) {
                setEditing(false)
                onEdit(comment, editedContent)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col  p-4 border-b">
            <div className='flex flex-row items-start dark:text-slate-200'>
                <div className='flex-shrink-0 mr-4'>
                    <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture || "https://tse1.mm.bing.net/th?id=OIP.wMgXjlCbLG7CIkCOUnuoYQAAAA&pid=Api&P=0&h=180"} alt={user.username} />
                </div>
                <div className="flex flex-col mb-1">
                    <span className='font-bold mr-1 text-sm truncate'>{user && user.username ? `@${user.username}` : "@anonymous user"}</span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
            {
                editing ? (
                    <>
                        <Textarea
                            placeholder='Add a comment...'
                            maxLength="200"
                            className='mt-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex flex-row-reverse mt-1 gap-1'>
                            <Button type='submit' gradientDuoTone="purpleToBlue" outline onClick={() => setEditing(false)}>Cancel</Button>
                            <Button type='submit' gradientDuoTone="purpleToBlue" onClick={handleSave}>Save</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-grow block sm:mt-2 sm:w-full">
                            <p className='block'>{comment.content}</p>
                        </div>
                        <div className="text-gray-500 flex gap-1 pt-3 text-xs">
                            <button
                                type='button'
                                onClick={() => onLike(comment._id)}
                                className={`hover:text-red-500 ${currentUser && comment.likes.includes(currentUser._id) ? "text-red-500" : ""}`}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className="">
                                {comment.numberOfLikes > 0 && comment.numberOfLikes + " " +
                                    (comment.numberOfLikes === 1 ? "like" : "likes")
                                }
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <button
                                        type='button'
                                        onClick={handleEdit} className='hover:text-blue-500'>
                                        Edit
                                    </button>
                                )
                            }
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default Comment