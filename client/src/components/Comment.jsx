import { useEffect, useState } from 'react'
import moment from 'moment';
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from 'react-redux'

const Comment = ({ comment, onLike }) => {
    const [user, setUser] = useState({});
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
            <div className="flex-grow block sm:mt-2 sm:w-full">
                <p className='block'>{comment.content}</p>
            </div>
            <div className="text-gray-500 flex gap-1 pt-3 text-xs">
                <button
                    type='button'
                    onClick={() => onLike(comment._id)}
                    className={`hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) ? "text-blue-500" : ""}`}
                >
                    <FaThumbsUp className='text-sm' />
                </button>
                <p className="">
                    {comment.numberOfLikes > 0 && comment.numberOfLikes + " " +
                        (comment.numberOfLikes === 1 ? "like" : "likes")
                    }
                </p>
            </div>
        </div>
    )
}

export default Comment