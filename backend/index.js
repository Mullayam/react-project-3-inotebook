const connectToMongo =  require('./dbconfig');
const express = require('express');
var cors = require('cors')
connectToMongo();
const app = express();
app.listen(5000)
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
//Routes
// app.use('/',(req, res)=>{
//     res.send ("Done Bro");
// });
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
