require('dotenv').config();
const express = require('express');
const userCtrl = require('./controllers/user');
const postCtrl = require('./controllers/posts');
const massive = require('massive');
const app = express();
app.use(express.json());
const session = require('express-session'); 

const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env; 

app.use(
  session ({
    resave:false, 
    saveUninitialized:true,
    secret: SESSION_SECRET,
    cookie: {maxAge:1000*60*60*24*7}
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl:{rejectUnauthorized:0}
})
.then(dbInstance => {
  app.set('db', dbInstance)
  app.listen(PORT, ()=> console.log(`Server Listening and Database Mounted on Port ${PORT}.`))
})
.catch(err=> console.log(err));


// //Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

// //Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost);
