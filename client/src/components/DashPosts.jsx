import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Spinner, Avatar, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const DashPosts = () => {
  const { currentUser } = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setLoading(false)
          setUserPosts(data.posts)
          if (data.posts.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getPosts()
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length
    try {
      setLoading(true)
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setLoading(false)
        setUserPosts((prev) => [...prev, ...data.posts])
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="table-auto overflow-x-auto p-2 w-full">
      {
        userPosts.length > 0 ? (
          <>
            <Table>
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {
                userPosts && userPosts.map((post) => (
                  <Table.Body key={post._id} className="divide-y p-2">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {(post.updatedAt)?.substring(0, 10)}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`${post.slug}`}>
                          <Avatar img={post.image} bordered size="md" className='float-start' />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`${post.slug}`}>
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell className='text-red-600 hover:underline cursor-pointer'>Delete</Table.Cell>
                      <Table.Cell>
                        <Link to={`/update-post/${post._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          Edit
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table >
            {
              showMore && (
                <span onClick={handleShowMore} className='text-teal-500 flex justify-center mt-2 hover:cursor-pointer'>
                  Show more
                </span>
              )
            }
          </>
        ) : (
          <p className='text-center mt-10' hidden={loading}>You don't have the posts now </p>
        )
      }
      {loading && <div className="text-center w-full mt-5">
        <Spinner aria-label="Center-aligned spinner Extra large example" size="xl" />
      </div>}
    </div >
  )
}

export default DashPosts
