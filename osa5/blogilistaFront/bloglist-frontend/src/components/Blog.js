import { useState } from 'react'

const Blog = ({ blog, toggleLikes, removeBlog }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div className="blog" style={blogStyle}>
      {!view ?
        <div>
   title: {blog.title} <button onClick={toggleView}>view</button>
        </div>
        :
        <div>
          <p>title: {blog.title} <button onClick={toggleView}>hide</button></p>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={toggleLikes}>like</button></p>
          <button onClick={removeBlog}>remove</button>


        </div>
      }
    </div>

  )
}

export default Blog