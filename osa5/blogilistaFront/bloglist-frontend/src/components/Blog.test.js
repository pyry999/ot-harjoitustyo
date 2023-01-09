import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Testi',
    author: 'Kirjailija',
    url: 'WWW'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('title: Testi')

  expect(element).toBeDefined()
})

test('shows all elements', async () => {
  const blog = {
    title: 'Testi',
    author: 'Kirjailija',
    url: 'WWW',
    likes: 777
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))

  const element1 = screen.getByText('title: Testi')
  const element2 = screen.getByText('author: Kirjailija')
  const element3 = screen.getByText('url: WWW')
  const element4 = screen.getByText('likes: 777')


  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
  expect(element4).toBeDefined()
})

test('clicking button twice calls event handled twice', async () => {
  const blog = {
    title: 'Testi',
    author: 'Kirjailija',
    url: 'WWW',
    likes: 9
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleLikes={mockHandler} />
  )

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})