const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const userRoute = require('./routes/userRoutes');
const malariInfoRoute = require('./routes/malariaInfoRoutes');

const mongoose = require('mongoose');
const cors = require('cors');

const MONGODB_URL = "mongodb://127.0.0.1:27017/malaria";


mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true
})
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
// Apply middleware
app.use(middleware);
app.use('/users', userRoute);
app.use('/malaria-info', malariInfoRoute);

app.disable('x-powered-by');
app.disable('etag');
app.disable('x-xss-protection');
app.disable('strict-transport-security');
app.disable('content-security-policy');
// const corsOptions = {
//   origin: false,
//   optionsSuccessStatus: 204
// };
// app.use(cors(corsOptions));
// 
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
