import React from "react";
import styles from "../styles/CreateForm.module.css";
import { useState, useEffect } from "react";
import { createProduct } from "../lib/api";

const defaultModel = { name: "", brand: "", img: "", price: 0, stock: 0 };

export default function CreateForm() {
  const [product, setProduct] = useState(defaultModel);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;
    setProduct({
      ...product,
      [name]: value,
    });
    setError(false);
  };

  const checkInput = () => {
    if (product.name === "") {
      return false;
    } else if (product.brand === "") {
      return false;
    } else if (product.img === "") {
      return false;
    } else if (product.price === 0) {
      return false;
    } else if (product.stock === 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    const valid = checkInput();
    if (valid) {
      const response = await createProduct(product);
      setProduct(defaultModel);
      setError(false);
    } else {
      setError(true);
      setProduct(defaultModel);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Add a new product</h3>
      <form>
        <div className={styles.row}>
          <div className={styles.col}>
            <input
              type="text"
              name="name"
              placeholder="Enter name..."
              className={styles.input}
              onChange={handleChange}
              value={product.name}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <input
              type="text"
              name="brand"
              placeholder="Enter brand.."
              className={styles.input}
              onChange={handleChange}
              value={product.brand}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <input
              type="text"
              name="img"
              placeholder="Enter image url.."
              className={styles.input}
              onChange={handleChange}
              value={product.img}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <input
              type="number"
              name="price"
              placeholder="Enter price.."
              className={styles.input}
              onChange={handleChange}
              value={product.price}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <input
              type="number"
              name="stock"
              placeholder="Enter stock.."
              className={styles.input}
              onChange={handleChange}
              value={product.stock}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}></div>
        </div>
        <div className={styles.row}></div>
      </form>
      <div className={styles.row}>
        <button onClick={handleSubmit} className={styles.button}>
          Create Product
        </button>
      </div>
      {error && (
        <div className={styles.error}>
          Something went wrong. Please check your input and try again.
        </div>
      )}
    </div>
  );
}
