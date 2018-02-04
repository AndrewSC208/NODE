const path    = require('path');
const express = require('express');
const http    = require('http');
/*
 *  GLOBAL CONSTANTS (I WOULD NORMALLY HAVE THESE IN A CONFIG/ENV FILE)
 */
const PORT = 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
/*
 *  START EXPRESS
 */
const app = express();
/*
 *  CONFIG EXPRESS
 */
app.use(express.static(PUBLIC_PATH));
/*
 *  START THE SERVER
 */
http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});