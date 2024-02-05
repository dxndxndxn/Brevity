require('dotenv').config();
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

app.post('/login', async (req, res) =>
{
    const { username, password } = req.body;

    try
    {
        const [results] = await pool.query('SELECT UserID, Password FROM Users WHERE UserName = ?', [username]);

        if (results.length === 0)
        {
            return res.status(401).send('User not found');
        }

        const match = await bcrypt.compare(password, results[0].Password);

        if (match)
        {
            return res.status(200).send('Login successful');
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

app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, '0.0.0.0', () =>
{
    console.log(`Server running on localhost:${port}`);
});