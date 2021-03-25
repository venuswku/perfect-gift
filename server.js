const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3010;

// Express serves everything inside build directory.
const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath));

// Serve index.html file.
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log(`Perfect Gift's server is running on port ${port}!`);
});