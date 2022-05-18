const express = require('express');
// cross origin requests 
const cors = require('cors');

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 3000;

//allow to call environment variables 
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors()); 
//pass json from frontend to backend 
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    const {message, user: sender, type, members } = req.body;

    if(type === "message.new") {
        members.
            filter((member) => member.user_id !== sender.id)
            forEach(({ user }) => {
            if(!user.online) {
                twilioClient.messages.create({
                    bode: `You have a new Message from ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to: user.phoneNumber
                })
                    .then(() => console.log('Message Sent!'))
                    .catch((err) => console.log(err))
            }
        })

        return res.status(200).send('Message Sent!')
    }
    return res.status(200).send('Not a new message request')
})

app.use('/auth', authRoutes);

//run server on a specific Port 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));