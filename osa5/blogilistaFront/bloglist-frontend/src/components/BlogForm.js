import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => (
    setNewAuthor(event.target.value)
  )

  const handleUrlChange = (event) => (
    setNewUrl(event.target.value)
  )

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>
        title:
          <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>
          author:
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </p>
        <p>
        url:
          <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </p>
        <p><button type="submit">save</button></p>
      </form>

    </div>
  )
}

export default BlogForm