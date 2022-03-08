const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 8080;
const environment = 'dev';
const apicache = require('apicache');

const app = express();
const postsJSON = require('./data/data.json')
const cache = apicache.middleware;
//const { sortBy } = require('./sortBy')

const pingRouter = require('./routes/ping')
const postsRouter = require('./routes/posts')
//middleware setup
app.use(morgan(environment));
app.use(bodyParser.json());

app.use('/api/ping', cache('30 minutes'), pingRouter())
app.use('/api/posts', cache('30 minutes'), postsRouter()) 

module.exports = app;
//search by tag field
// app.get('/api/posts/:tags', (req, res) => {
    // const { tags } = req.params
    // const input = tags.split(',')
// 
// 
    // const postsFilteredByTag = postsJSON.posts.filter(element => {
        // const arr = ((element.tags.filter(tag => input.includes(tag))))
        // return arr.length > 0 ? true : false
    // })
// 
    // res.json(postsFilteredByTag)
// 
// })
// app.get('/api/posts/:tags/:key', (req, res, next) => {
    // const { tags, key } = req.params
   // console.log("req", req);
   // console.log("res", res)
    // const input = tags.split(',')
    // const postArr = postsJSON.posts
   // if key doesnot exist throw an error "sortBy parameter is invalid"
    // /* if (!postsJSON.posts.hasOwnProperty(key)) {
        // res.status(400).json({ error: "sortBy parameter is invalid" })
    // } */
// 
    // const postsFilteredByTag = postsJSON.posts.filter(element => {
        // const arr = ((element.tags.filter(tag => input.includes(tag))))
        // return arr.length > 0 ? true : false
    // })
// 
    // const sortedPosts = postsFilteredByTag.sort(sortBy(key))
    // res.json(sortedPosts)
// 
// 
// })
// app.get('/api/posts/:tags/:key/:order', (req, res) => {
    // const { tags, key, order } = req.params
    // console.log(tags, key, order)
    // const input = tags.split(',')
   // console.log(input)
// 
   // console.log(postsJSON.posts)
// 
    // const postsFilteredByTag = postsJSON.posts.filter(element => {
        // const arr = ((element.tags.filter(tag => input.includes(tag))))
        // return arr.length > 0 ? true : false
    // })
    // console.log(typeof key, typeof order)
    // const sortedPosts = postsFilteredByTag.sort(sortBy(key, order))
    // console.log(sortedPosts)
    // res.json(sortedPosts)
// 
// })
// 

//app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))