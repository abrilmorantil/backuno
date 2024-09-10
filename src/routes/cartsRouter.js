import { Router } from "express";
import { v4 as uuidv4 } from "uuid"

const router = Router();

const cart = [];
let products = [];

router.get('/', (req, res) => {
    res.json(cart);
});

router.get('/:cid', (req, res) => {
    const id = req.params.cid; 
    const cartFound = cart.find(c => c.id === id);
    if (!cartFound) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cartFound);
});


router.post('/', (req, res) => {
    const { products: productsInCart } = req.body;

    if (!Array.isArray(productsInCart)) {
        return res.status(400).json({ message: 'Invalid or missing fields' });
    }


    const newCart = { id: uuidv4(), products: productsInCart };

    cart.push(newCart);
    res.status(201).json({ message: 'Cart created', carrito: newCart });
});


router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid; 
    const pid = req.params.pid; 

    const cartFound = cart.find(c => c.id === cid);
    const productFound = products.find(p => p.id === pid);

    if (!cartFound) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    if (!productFound) {
        return res.status(404).json({ message: 'Product not found' });
    }


    if (!cartFound.products.includes(productFound)) {
        cartFound.products.push(productFound);
    }

    res.status(200).json({ message: 'Product added', carrito: cartFound });
});

export default router;
