require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 8080;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

app.get('/messages', async (req, res) =>
{
    try
    {
        const [messages] = await pool.query(`
            SELECT m.Message, m.TimeStamp, u.UserName 
            FROM Messages m
            JOIN Users u ON m.SenderUserID = u.UserID
            ORDER BY m.TimeStamp ASC
        `);
        res.json(messages);
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Server error fetching messages');
    }
});

app.post('/send-message', async (req, res) =>
{
    const { senderUserId, message } = req.body;

    try
    {
        await pool.query('INSERT INTO Messages (Message, SenderUserID, TimeStamp) VALUES (?, ?, NOW())', [message, senderUserId]);
        res.status(201).send('Message sent');
    }
    catch (err)
    {
        console.error("Error sending message:", err);
        res.status(500).send('Server error sending message');
    }
});

app.post('/login', async (req, res) =>
{
    const { username, password } = req.body;

    try
    {
        const [users] = await pool.query('SELECT UserID, Password FROM Users WHERE UserName = ?', [username]);
        
        if (users.length === 0)
        {
            return res.status(401).send('User not found');
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.Password);

        if (match)
        {
            const accessToken = jwt.sign({ id: user.UserID, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.json({ accessToken, user: { id: user.UserID, username } });
        }

        else
        {
            return res.status(401).send('Password incorrect');
        }
    }

    catch (err)
    {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../client/build/index.html'));});
app.listen(port, '0.0.0.0', () => {console.log(`Server running on localhost:${port}`);});
