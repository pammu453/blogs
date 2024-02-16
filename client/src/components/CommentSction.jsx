import { Alert, Button,Textarea } from 'flowbite-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CommentSction = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ postId, userId: currentUser._id, content: comment }),
                credentials: "include",
            })
            const data = await res.json()
            if (!res.ok) {
                setCommentError("Unable to post a comment")
            } else {
                setComment("")
                setCommentError(null)
            }
        } catch (error) {
            setCommentError("Unable to post a comment")
        }
    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                true ? (
                    <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                        <p>Signed in as :</p>
                        <img className='h-5 object-cover border ' src={currentUser.profilePicture} alt="" />
                        <Link to={"/dashboard?tab=profile"} className='text-sm text-cyan-500 hover:underline'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-2 text-teal-400 text-sm">
                        You must be signed in to comment.
                        <Link to={"/sign-in"} className='text-blue-400 hover:underline'>Sign in</Link>
                    </div>
                )
            }
            {
                currentUser && (
                    <form onSubmit={handleSubmit} className='border p-2 caret-lime-900 rounded-md dark:bg-slate-800'>
                        <Textarea
                            placeholder='Add a comment...'
                            rows='6'
                            maxLength="200"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <div className='flex items-center justify-between mt-3'>
                            <p className='italic text-sm'>{200 - comment.length} charecters remaining</p>
                            <Button type='submit' gradientDuoTone="purpleToBlue" outline>Submit</Button>
                        </div>
                        {commentError && <Alert color="failure" className='mt-2'>{commentError}</Alert>}
                    </form>
                )
            }
        </div>
    )
}

export default CommentSction
