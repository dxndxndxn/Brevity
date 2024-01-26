const express = require('express');
const path = require('path');
const exec = require('child_process').exec;

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// The "catchall" handler: for any request that doesn't match one above, 
// send back the index.html file. This ensures that your React routing works
// properly.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on localhost:${port}`);
});