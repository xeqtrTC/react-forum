const express = require('express');
const app = express(); // express
const cors  = require('cors');
const session = require('express-session');
const sessionUCP = require('express-session')
// const MySQLStore = require('express-mysql-session')(session);
const bodyParser  = require('body-parser');
// const passport = require('passport');
const passportUCP = require('./api calls/UCP/UcpPassport/ucppassport')
const forumPassport = require('./PassportAuthentication/passport');
// const Passport = require('passport').Passport,
//     passport = new Passport(),
//     passportUCP = new Passport();
const cookieParser  = require('cookie-parser');
const pool = require('./Database/connection')
const ucpPool = require('./Database/ucpConnection');
const credentials = require('./credentials');
const dotenv  = 'dotenv';
const usersRouter = require('./api calls/usersRouter');
const { logger } = require('./logs/logger');
const errorHandler = require('./logs/errorHandler');
const path = require('path')
const multer = require('multer');
const sessionStore = require('./database/sessions');
const sessionStoreUCP = require('./Database/ucpSessions');
const {cloudinary} = require('./cloudinary');
const useragent = require('express-useragent')
const http = require('http');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const limiter = require('./rateLimiter');



require('./PassportAuthentication/passport')
require('./api calls/UCP/UcpPassport/ucppassport')
app.use(logger);
const socketio = require('socket.io');


const rateLimiter = new RateLimiterMemory(
  {
    points: 5,
    duration: 1, 
  }
)

require('dotenv').config();

const port = 5000; // port of the backend server
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true

  },

});
app.set('trust proxy', true)

app.use(credentials);
app.use(
    cors({
         origin:[ "http://localhost:3000", "http://localhost:3001"], 
         // allow to server to accept request from different origin
         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
         credentials: true, // allow session cookie from browser to pass through
   })
);
app.use(useragent.express())
// app.use(limiter);


const sessionMiddleware = session({
  secret: 'forum',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  secure: true,
  httpOnly: true,
  sameSite: 'none',
  cookie: {maxAge: 3600000000 },
  name: 'Forum'
})
const sessionMiddlewareSecond = sessionUCP({
  secret: 'ucp',
  store: sessionStoreUCP,
  resave: false,
  saveUninitialized: false,
  secure: true,
  httpOnly: true,
  sameSite: 'none',
  cookie: {maxAge: 3600000000 },
  name: 'Ucp'
})
// io.on("connection", (socketio) => {
//     console.log('client connected', socketio.id)

//     socketio.join('global-room');

//     socketio.on('disconnect', (reason) => {
//         console.log(reason);
//     })
//   });

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); 
// app.use(sessionMiddleware)
// app.use(sessionMiddlewareSecond)

app.use(cookieParser());
// app.use(passportUCP.initialize());
// app.use(passportUCP.session());
// app.use(forumPassport.initialize());
// app.use(forumPassport.session());


// app.use('/refresh', require('./Routes for api calls/refreshtokenapi'))
app.use('/api/users/unprotected', sessionMiddleware, forumPassport.initialize(), forumPassport.session(),  require('./Routes for api calls/Unprotected Routes/usersRoutes'))
app.use('/api/ucp/users', sessionMiddlewareSecond, passportUCP.initialize(), passportUCP.session(), require('./Routes for api calls/UCP/userRouter/userRouter'))


app.use('/api/category', sessionMiddleware, forumPassport.initialize(), forumPassport.session(),  require('./Routes for api calls/Protected Routes/posts'));
app.use('/api/users', sessionMiddleware, forumPassport.initialize(), forumPassport.session(),  require('./Routes for api calls/Protected Routes/users'));

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
  } else {
      res.type('txt').send('404 Not Found')
  }
})


const storage = multer.diskStorage({})

const upload = multer({ 
    storage
})


app.post('/acab/upload', upload.single('image'), async (req, res) => {
    console.log('mozda')      
  const fileStr = req.body.data
        console.log(req.body)
        console.log(fileStr);
    try {

        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        console.log(uploadResponse);
        const {public_id} = uploadResponse;
        console.log(public_id);
        
        res.json({ public_id })
    } catch (err) {
        console.log(err);
    }
})


app.use((req, res, next) => {
  console.log('This is a middleware layer!', req.url);    // Log req.url
});



const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(forumPassport.initialize()));
io.use(wrap(forumPassport.session()));


   




  io.on("connection", async(socket) => {
    const sql = 'INSERT INTO messages SET ?';
    const sql2 = 'INSERT INTO messagesfromrooms SET ?';
    console.log("New client connected", socket.id);
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    // await rateLimiter.consume(socket.handshake.address)

    // const testacab = () => {
    //   const sql3 = 'SELECT username, image, Administrator, RegisteredUser, CommunityManager,Director,HeadAdmin,Admin,VodjaHelpera,Helper, VodjaPromotera,Promoter, org1lider, org2lider,org3lider,org4lider,org5lider, org6lider,org7lider FROM users INNER JOIN roles ON users.username = roles.roleusername WHERE uid = ?'
    
          
    //   pool.query(sql3, [socket.request.user.uid], (err, result) => {
    //       if(err) {
    //           // next()
    //       } else {
    //           const { 
    //               username,
    //               image,
    //               Administrator,
    //               RegisteredUser,
    //               CommunityManager,
    //               Director,
    //               HeadAdmin,
    //               Admin,
    //               VodjaHelpera,
    //               Helper, 
    //               VodjaPromotera,
    //               Promoter, 
    //               org1lider, 
    //               org2lider,
    //               org3lider,
    //               org4lider,
    //               org5lider,
    //               org6lider,
    //               org7lider 
    //               } = result[0];
    //               const register = 'Registered User'
                  
    //           const rolesList = [{
    //               "<p className='webDeveloper'>WEB</p>": Administrator,
    //               "<p className=''>Community Manager</p>": CommunityManager,
    //               "<p className=''>Director</p>": Director,
    //               "<p className='registeredRed'>Head Admin</p>": HeadAdmin,
    //               Admin,
    //               'Vodja Helpera': VodjaHelpera,
    //               Helper, 
    //               "<p className='registeredRed'>Vodja Promotera</p>": VodjaPromotera,
    //               "<p className='registeredRed'>Newbie</p>": RegisteredUser,
    
    //               Promoter, 
    //               org1lider, 
    //               org2lider,
    //               org3lider,
    //               org4lider,
    //               org5lider,
    //               org6lider,
    //               org7lider
    //       }]
    
    //           const imageResult = image
    //           const roles =  Object.keys(rolesList[0]).filter((item) => rolesList[0][item] > 0)
              
    
    //           const resultinfo = {
    //               roles, username, imageResult
    //           }
    
    //           return {resultinfo}
              
    
    
    //         }
    //   })
    // }
    
    


    // const { resultinfo  } = testacab
    // console.log(resultinfo);
    socket.emit('info_aboutuser', usersRouter.stateofUser)


    // console.log(socket.request.user);
    socket.on("send_message", async(data) => {
        console.log(data);
        const dataContent = {
          messagecontent: data,
          messageuser: socket.request.user.username,
          messageimage: socket.request.user.image,
          messagedate: new Date().toISOString()
        }
        socket.broadcast.emit('send_all_messages', dataContent);
        socket.emit('message', dataContent)
        // socket.emit('messageList', data)
        // console.log('recieve', data) 
        // console.log('data', data);
          pool.query(sql, {messageuser: socket.request.user.username, messagecontent: dataContent.messagecontent, messageimage: socket.request.user.image, messagedate: new Date().toISOString()}, (err, result) => {
            if(err) {
              console.log(err);
            }
          })

       
    })

    socket.on('join_room', (data) => {
      socket.join(data);
    })

    socket.on('send_message_private', (data) => {

      const privateMessagesContent = {
        roommessage_roomid: data.roomIdValue,
        roommessage_sender: socket.request.user.username,
        roommessage_sender_image: socket.request.user.image,
        roommessage_receiver: data.messageReceiver,
        roommessage_content: data.messageContent,
        roommessage_date: new Date()

      }
      console.log(data);

      socket.to(data.roomIdValue).emit('receive_message_private', privateMessagesContent);
      socket.emit('message_test', privateMessagesContent)

        pool.query(sql2, {roommessage_roomid: privateMessagesContent.roommessage_roomid, roommessage_sender: privateMessagesContent.roommessage_sender, roommessage_sender_image: privateMessagesContent.roommessage_sender_image ,roommessage_receiver: privateMessagesContent.roommessage_receiver, roommessage_content: privateMessagesContent.roommessage_content, roommessage_date: new Date() }, (err, rows) => {
          if(err) {
            console.log(err);
          }
        });
      
      // socket.to(data.room).emit('receive_message_private', data);
    })



    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });






app.use(errorHandler);


server.listen(5000, () => {
    console.log('socket radi')
})
// app.listen(5000, () => {
//     console.log(`server radi na portu ${port}`)
// }) 