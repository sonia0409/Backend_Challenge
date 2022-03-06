const { default: axios } = require('axios');
const express = require('express');
const postsRouter = express.Router();
const { getPosts } = require('./apicalls')
const { sortByCategory } = require('../sortByCategory')

module.exports = () => {
    postsRouter.get("/", (req, res) => {
        res.status(400).json({ error: "Tags parameter is required" })
    })
    postsRouter.get("/:tags/:sortBy?/:direction?", (req, res) => {
        const { tags, sortBy, direction } = req.params;
        //add undefined to the validation arrays to allow api work without sortBy and direction
        const validSortBy = ['id', 'authorId', 'likes', 'popularity','reads', undefined];
        const validDirection = ['asc', 'desc', undefined]
        const multipleTagsArr = tags.split(',')
    
        if(!validSortBy.includes(sortBy) || !validDirection.includes(direction)){
            res.status(400).json({ error: "sortBy parameter is invalid" })
        }
        //fetch posts by one tag, direction
        const getPostsByDirection = (tags, sortBy, direction) => {
            return axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
                .then(results => {
                    const postsByTag = results.data.posts
                    if(sortBy || direction){
                        const sortedPosts = postsByTag.sort(sortByCategory(sortBy,direction))
                        res.json(sortedPosts)
                        
                    } else {
                        res.json(postsByTag)
                    }
                })
                .catch(err => console.error(err.message))
        }

        getPostsByDirection(tags, sortBy, direction)
        /*   Promise.all(requests)
          .then(results => {
              res.json(results[0].data);
          }).catch(err => console.error(err.message)) */

    })
    return postsRouter;
}