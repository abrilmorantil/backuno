import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const newId = () => { return uuidv4();}

let products = [];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;

    const product = products.find( p => p.id === id);

    if(product) {
        res.json(product)
    }else{
        res.status(404).json({msg: "product not find"});
    }
});

router.post('/', (req, res) => {
    const { tittle, description, code, price, stock, category} = req.body;
    if(!tittle || typeof tittle !== 'string'){
        return res.status(400).json({msg: "Invalid or missing 'title'"});
    };
    if(!description || typeof description !== 'string'){
        return res.status(400).json({msg: "Invalid or missing 'description'"});
    };
    if(!code || typeof code !== 'string'){
        return res.status(400).json({msg: "Invalid or missing 'code'"});
    };
    if(!category || typeof category !== 'string'){
        return res.status(400).json({msg:"Invalid or missing 'category'"});
    };
    if(!price || typeof price !== 'number'){
        return res.status(400).json({msg: "Invalid or missing 'price'"});
    };
    if(!stock || typeof stock !== 'number'){
        return res.status(400).json({msg: "Invalid or missing 'stock'"})
    };

    const newProduct = {
        id: newId(),
        tittle,
        description,
        code,
        price,
        stock,
        category
    }
    products.push(newProduct);
    res.status(201).json({msg: "Product added"});
});

router.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { tittle, description, code, price, stock, category} = req.body;
    const product = products.find(p => p.id === id);

    if(!product){
        return res.status(404).json({msg: "Product not found"});
    };
    
    if (tittle !== undefined) product.tittle = tittle;
    if (description !== undefined) product.description = description;
    if (code !== undefined) product.code = code;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;

    res.json({ msg: "Product updated", product });

});

router.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ msg: "Product not found" });
    }

    products.splice(index, 1);
    res.json({ msg: "Product deleted" });
});

export default router