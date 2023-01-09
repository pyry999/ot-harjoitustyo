import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {

    // event.preventDefault()
    /*const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }*/

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setErrorMessage('blog added')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  /*
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => (
    setNewAuthor(event.target.value)
  )

  const handleUrlChange = (event) => (
    setNewUrl(event.target.value)
  )*/

  const blogFormRef = useRef()

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const toggleLikes = id => {
    const blog = blogs.find(b => b.id===id)
    console.log(blog)
    const newBlog = {
      ...blog
    }

    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id===id ? returnedBlog : blog))
      })
      .catch(() => {
        setErrorMessage(
          'SSSSAaaatana'
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  const removeBlog = id => {
    const blog = blogs.find(b => b.id===id)
    if(window.confirm(`Do you want to remove "${blog.title}"`)) {
      blogService
        .remove(id)
        .then(
          setBlogs(blogs.filter(b => b.id !== id)))
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {!user ?
        LoginForm({ handleLogin, username, setUsername, password, setPassword }) :
        <div>
          <p>{user.username} logged in<button onClick={logout}>logout</button></p>
          <Togglable buttonLabel="add new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <ul>
            {blogs.map(blog =>
              <div><Blog key={blog.id} blog={blog} toggleLikes={() => toggleLikes(blog.id)} removeBlog={() => removeBlog(blog.id)}/></div>
            )}
          </ul>
        </div>
      }

    </div>

  )
}

export default App
