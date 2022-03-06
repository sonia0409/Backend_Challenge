const axios = require('axios')

const getPosts = (req, res) => {
    const { tags, sortBy, direction } = req.params
    const validSortBy = ['id', 'authorId', 'likes', 'popularity','reads'];
    const validDirection = ['asc', 'desc']
    const multipleTagsArr = tags.split(',')

    if(!validSortBy.includes(sortBy) || !validDirection(direction)){
        res.status(400).json({ error: "sortBy parameter is invalid" })
    } else {
        //const postsFilteredByTag = postsJSON.posts.filter(element => {
            //an array of all the api calls made with tags.
            const getPostsByTags = multipleTagsArr.map(tag => {
                return axios.get(`https://api.hatchways.io/assessment/solution/posts?tags=${tag}&sortBy=${sortBy}&direction=${direction}`)
            })
            //return arr.length > 0 ? true : false
        //})
    }
}

module.exports = { getPosts }