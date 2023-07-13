import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middlware";
import { getOneProduct, getProducts, createProduct, deleteProduct } from "./handlers/product";


const router = Router();

/**
 * PRODUCT
 */
router.get("/product", getProducts)


router.get("/product/:id", getOneProduct);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("product").isString(),
  handleInputErrors,
  async (req, res) => {
    res.end();
  }
);
router.delete("/product/:id", deleteProduct);

/**
 * UPDATE
 */

router.get("/update", (req, res) => {});
router.get(
  "/update/:id",
  body("title").optional,
  body("body").optional,
  body('status').isIn([
    body("IN_PROGRESS"),
    body("LIVE"),
    body("DEPRECATED"),
    body("ARCHIVED"),
  ]),
  body("version").optional,
  (req, res) => {}
);
router.post(
  "/update",
  body("title").optional,
  body("body").optional,
  (req, res) => {}
);
router.put("/update/:id", (req, res) => {});
router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updatedId").optional().isString(),
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
