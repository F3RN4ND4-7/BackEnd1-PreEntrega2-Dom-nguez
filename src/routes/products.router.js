import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { validateProduct } from "../middlewares/validateAddedProduct.js";
import { __dirname } from "../path.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products/js`);

// GET ALL PRODUCTS
router.get("/ ", async (req, res) => {
  try {
    const { limit } = req.query;

    const productList = await productManager.getProducts(limit);
    res.status(200).json(productList)
  } catch (error) {
    res.status(500).json({ error: "OMG sorry, could not get product list 🧌" });
  }
});

router.get("/:prodId ", async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await productManager.getProductById(prodId);

    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: `Ups, could not get product 🧌` });
  }
});

router.post("/ ", validateProduct, async (req, res) => {
  try {
    const productInfo = req.body;
    const newProduct = await productManager.addProducts(productInfo);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `Dang, could not add product 🧌` });
  }
});


router.put("/:prodId ", async (req, res) => {
  try {
    const { prodId } = req.params;
    const newProperties = req.body;

    const updatedProduct = await productManager.updateProduct(
      prodId,
      newProperties
    );

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occured, we could'nt update product with id 🧌 ${prodId}` });
  }
});

// REMOVE PRODUCT
router.delete("/:prodId ", async (req, res) => {
  try {
    const { prodId } = req.params;
    const newProductList = await productManager.deleteProduct(prodId);

    if (newProductList) {
      res.status(200).json(newProductList);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Sorry, couldn't detele product with id ${prodId} 🧌` });
  }
});


export default router;
