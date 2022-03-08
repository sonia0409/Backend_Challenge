const { default: axios } = require('axios');
const express = require('express');
const postsRouter = express.Router();
const { getPosts } = require('./apicalls')
const { sortByCategory } = require('../sortByCategory')

module.exports = () => {
    postsRouter.get("/", (req, res) => {
        return res.status(400).json({ error: "Tags parameter is required" })
    })
    postsRouter.get("/:tags/:sortBy?/:direction?", (req, res) => {
        const { tags, sortBy, direction } = req.params;
        //add undefined to the validation arrays to allow api work without sortBy and direction
        const validSortBy = ['id', 'authorId', 'likes', 'popularity', 'reads', undefined];
        const validDirection = ['asc', 'desc', undefined]
        const multipleTagsArr = tags.split(',')
        //to validate the tags
        const validTags = ['tech', 'health', 'history', 'science', 'startups', 'culture', 'design', 'politics']


        if (!validSortBy.includes(sortBy) || !validDirection.includes(direction)) {
            return res.status(400).json({ error: "sortBy parameter is invalid" })
        }
        //fetch posts by one tag,then sortBy,and order by direction - happy path
        /* const getPostsByTags = (tags, sortBy, direction) => {
            return axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
                .then(results => {
                    const postsByTag = results.data.posts
                    if (sortBy || direction) {
                        const sortedPosts = postsByTag.sort(sortByCategory(sortBy, direction))
                        res.json(sortedPosts)

                    } else {
                        res.json(postsByTag)
                    }
                })
                .catch(err => console.error(err.message))
        } */


            multipleTagsArr.filter(tag => {
                if (!validTags.includes(tag)) {
                   return res.status(404).json({ error: "Tag parameter is invalid" })             
                }
            })

        //api call with multiple tags
        
        const getPostsByMultipleTags = (multipleTagsArr, sortBy, direction) => {

            //an array of api calls made with each tag
            const apiCallArr = multipleTagsArr.map(tag => {
                return axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
            })

            //to fetch posts by the tags, each API call made by the tag is independent
            //thus there are chances of duplicacy.
            //an array of requests can be resolved by Promise. all
            Promise.all(apiCallArr)
                .then(results => {
                    //an array of objects => an object of posts=> an array of objects==> array of tags.
                    const allPosts = []
                    const outcome = results.forEach(output => {
                        allPosts.push(...output.data.posts)
                    })
                    //initialise a set object
                    const newObjSet = new Set();
                    // filter the all Posts array to remove the duplicates
                    const filteredAllPosts = allPosts.filter(postObj => {
                        const isPresentInSet = newObjSet.has(postObj.id);
                        newObjSet.add(postObj.id);
                        return !isPresentInSet
                    })
                    if (sortBy || direction) {
                        const sortedPosts = filteredAllPosts.sort(sortByCategory(sortBy, direction))
                        return res.json({ posts: sortedPosts })

                    } else {
                        return res.json({ posts: filteredAllPosts })
                    }
                })
                .catch(err => console.log(err.message))
        }
        

           return getPostsByMultipleTags(multipleTagsArr, sortBy, direction)
    

    })
    return postsRouter;
}