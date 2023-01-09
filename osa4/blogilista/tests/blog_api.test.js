const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog.js')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('id should be defined', async () => {
    const response = await api.get('/api/blogs')
    for(let i = 0; i<response.body.length; i++) {
        expect(response.body[i]._id).toBeDefined()
    }
})


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('post add blog', async () => {
    const newBlog = {
        'title': 'pouta',
        'author': 'pekka',
        'url': 'ww',
        'likes': 10
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
})

test('likes should be 0', async () => {
    const newBlog = {
        'title': 'liket',
        'author': 'nolla',
        'url': 'www'
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toEqual(0)
})
/*
test('no title or url should not work', async () => {

    const newBlog = {
        'author': 'nolla'
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})*/
/*
test('delete', async () => {
    const blogs = await helper.blogsInDb()
    const IdToDelete = blogs[0]
    await api.delete(`/api/blogs/${IdToDelete._id}`).expect(204)

    const blogsAtEnd = helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
})*/

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
  
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
  
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('invalid user is not added', () => {
    test('password too short', async () => {
        

        const newUser = {
            username: 'hihhuliii',
            name: 'pinja',
            password: 'ad',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

         
    })

/*  test('username too short', async () => {
        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: 'hi',
            name: 'pinja',
            password: 'addd',
        }

        await api
            .post('/api/users')
            .send(newUser)

        const usersAtEnd = helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        
    }) */
})

test('req without token', async () => {
    const newUser = {
        username: 'hihhuliii',
        name: 'Meeri',
        password: 'asdafgh',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
})

test('a blog can be edited', async () => {
    const aBlogAtStart = (await helper.blogsInDb())[0]
    const editedBlog = {
        ...aBlogAtStart,
        likes: 99
    }

    await api
        .put(`/api/blogs/${aBlogAtStart.id}`)
        .send(editedBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const aBlogAtEnd = blogsAtEnd.find(b => b.id === aBlogAtStart.id)
    expect(aBlogAtEnd.likes).toBe(99)
})

afterAll(() => {
    mongoose.connection.close()
})