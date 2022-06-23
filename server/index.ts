import http from 'http';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
// local imports
import app from './app';

const log = console.log;
dotenv.config();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

mongoose.connection.once('open', function(){
    log('DB connection ->SUCCESS');
});

mongoose.connection.on('error', function(error){
    log(`DB connection ERROR -> ${error}`)
});

async function startServer(){
    const DB_URL = process.env.DB_CONNECT as string;
    await mongoose.connect(DB_URL);

    server.listen(PORT, function(){
        log(`Server running on PORT -> ${PORT}`);
    });
};

startServer();