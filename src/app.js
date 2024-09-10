import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';

const app = express();
const port = 8000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
