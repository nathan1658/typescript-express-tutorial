import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware'

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.connectDb();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: Array<any>) {
        controllers.forEach((c) => {
            this.app.use('/', c.router);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        })
    }

    private connectDb() {
        const { MONGO_PATH, PORT } = process.env;
        mongoose.connect(`mongodb://${MONGO_PATH}:${PORT}`)
    }

}

export default App;