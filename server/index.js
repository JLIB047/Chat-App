const express = require('express');
// cross origin requests 
const cors = require('cors');

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 3000;

//allow to call environment variables 
require('dotenv').config();

app.use(cors()); 
//pass json from frontend to backend 
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);

//run server on a specific Port 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));