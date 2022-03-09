## Summary
Backend_Challenge is one of the challenges provided by Hatchways. Purpose of this application is to setup only the server-side endpoints, and use external API/ endpoints to fetch the data and cache locally. So,no database(/data folder) is maintained or setup locally for this application. 
* In this application two endpoints are of main focus: '/api/pings' - to ensure a successfull connection with the external API.; '/api/posts' this endpoint indicate a user to add a tag like 'tech', 'health', 'politics', 'science' and so on, thus, 'api/posts/tech,health' endpoint prints out the list of blog posts as per the tag(s) provided. The blog posts can be filtered by one or more than one tags. However, the blog posts can also be filtered and sorted based on the categories like 'id', 'authorId', 'likes' , and direction can be 'asc' for ascending, and 'desc' for descending. For instance api/posts/tech,health/likes/desc - this endpoint will sort the tech & history blog posts in descending order as per the number of likes.  

## Setup
* clone the git repository
* Install dependencies with npm install.
* CLI - 
 1. to start the server
```
npm start 
```
2. to run the test - Jest Test Framework
```
npm run test
```

## Dependencies
- apicache
- axios
- body-parser
- express
- morgan
- jest
- supertest
- nodemon