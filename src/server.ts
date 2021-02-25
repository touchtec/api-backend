import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);


/*app.get('/', (request, response) => {
    return response.json({ message : 'Hello Barber...'});
})*/

app.listen(4000, () => {
    console.log('Server started port on 4000!');
})