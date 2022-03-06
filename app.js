const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 8080;
const environment = 'dev';

const app = express();
const postsJSON = require('./data/data.json')
const { sortBy } = require('./sortBy')

//middleware setup
app.use(morgan(environment));
app.use(bodyParser.json());

app.get('/api/ping', (req, res) => {
    res.status(200).json({ success: true });
})
//shows list of all the posts
app.get('/api/posts', (req, res) => {
    res.status(200).json(postsJSON);
})
//search by tag field
app.get('/api/posts/:tags', (req, res) => {
    const { tags } = req.params
    //console.log(tags)
    const input = tags.split(',')
    //console.log(input)

    //console.log(postsJSON.posts)

    const postsFilteredByTag = postsJSON.posts.filter(element => {
        const arr = ((element.tags.filter(tag => input.includes(tag))))
        return arr.length > 0 ? true : false
    })

    res.json(postsFilteredByTag)

})
app.get('/api/posts/:tags/:key', (req, res) => {
    const { tags, key } = req.params
    console.log(tags, key)
    const input = tags.split(',')
    //console.log(input)

    //console.log(postsJSON.posts)

    const postsFilteredByTag = postsJSON.posts.filter(element => {
        const arr = ((element.tags.filter(tag => input.includes(tag))))
        return arr.length > 0 ? true : false
    })

    const sortedPosts =  postsFilteredByTag.sort(sortBy(key))
    res.json(sortedPosts)

})
app.get('/api/posts/:tags/:key/:order', (req, res) => {
    const { tags, key, order } = req.params
    console.log(tags, key, order)
    const input = tags.split(',')
    //console.log(input)

    //console.log(postsJSON.posts)

    const postsFilteredByTag = postsJSON.posts.filter(element => {
        const arr = ((element.tags.filter(tag => input.includes(tag))))
        return arr.length > 0 ? true : false
    })
    console.log(typeof key, typeof order)
    const sortedPosts =  postsFilteredByTag.sort(sortBy(key, order))
    console.log(sortedPosts)
    res.json(sortedPosts)

})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))