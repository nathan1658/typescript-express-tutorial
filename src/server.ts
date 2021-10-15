import * as express from 'express';
import * as bodyParser from 'body-parser';

function loggerMiddleware(request:express.Request, response: express.Resonse, next)
{
    console.log(`${request.method} ${request.path}`);
    next();
}


const app = express();

app.use(loggerMiddleware);
app.use(bodyParser.json());

app.get('/',(request,response)=>{
    response.send('hello!');
})

app.listen('5000');