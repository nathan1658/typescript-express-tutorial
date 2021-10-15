import App from './app';
import PostsController from './posts/posts.controller';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
    [
        new PostsController(),
    ],
    5000
);

const { MONGO_PATH, PORT } = process.env;

mongoose.connect(`mongodb://${MONGO_PATH}:${PORT}`)


app.listen();