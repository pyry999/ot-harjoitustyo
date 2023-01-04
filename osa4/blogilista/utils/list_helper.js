
const totalLikes = (blogs) => {
    let likes = 0
    for(let i = 0; i<blogs.length; i++) {
        likes += blogs[i].likes
    }
    return likes
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    for(let i = 1; i < blogs.length; i++) {
        if(blogs[i].likes>favorite.likes) favorite = blogs[i]
    }
    return favorite
}

const mostBlogs = (blogs) => {
    let authors = Array()
    let numbers = Array()
    for(let i = 0; i<blogs.length; i++) {
        if(authors.includes(blogs[i].author)) {
            let index = authors.indexOf(blogs[i].author)
            numbers[index] += 1
        }
        else {
            let a = blogs[i].author
            authors = authors.concat(`${a}`)
            numbers = numbers.concat(1)
        }
    }
    let biggestNumberIndex = 0
    for(let i = 1; i<numbers.length; i++) {
        if(numbers[biggestNumberIndex]<numbers[i]) biggestNumberIndex = i
    }
    
    const resAuthor = authors[biggestNumberIndex]
    const resBlogs = numbers[biggestNumberIndex]
    
    const result = {
        'author': resAuthor,
        'blogs': resBlogs
    }
    return result
}

const mostLikes = (blogs) => {
    let authors = Array()
    let numbers = Array()
    for(let i = 0; i<blogs.length; i++) {
        if(authors.includes(blogs[i].author)) {
            let index = authors.indexOf(blogs[i].author)
            numbers[index] += blogs[i].likes
        }
        else {
            let a = blogs[i].author
            let addition = blogs[i].likes
            authors = authors.concat(`${a}`)
            numbers = numbers.concat(addition)
        }
    }
    let biggestNumberIndex = 0
    for(let i = 1; i<numbers.length; i++) {
        if(numbers[biggestNumberIndex]<numbers[i]) biggestNumberIndex = i
    }
    
    const resAuthor = authors[biggestNumberIndex]
    const resLikes = numbers[biggestNumberIndex]
    
    const result = {
        'author': resAuthor,
        'likes': resLikes
    }
    return result
}
  
module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}