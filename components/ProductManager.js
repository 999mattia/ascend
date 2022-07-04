import react from "react";
import { getAllProducts, deleteProductById } from "../lib/api";
import { useState, useEffect } from "react";
import styles from "../styles/ProductManager.module.css";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [confirming, setConfirming] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await getAllProducts();
    setProducts(response);
  };

  useEffect(() => {
    const filterProducts = () => {
      if (query.trim() === "") {
        setFiltered(products);
      } else {
        const filter = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(filter);
      }
    };
    filterProducts();
  }, [query, products]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    await deleteProductById(id);
    setConfirming("");
    loadProducts();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Product Manager</h3>
      <input
        className={styles.searchBar}
        onChange={handleChange}
        value={query}
        placeholder="Search a product"
      />
      <div className={styles.products}>
        {filtered.map((product) => {
          return (
            <div key={product.id} className={styles.product}>
              <div>{product.name}</div>

              {confirming === product.id ? (
                <div>
                  Delete?
                  <div>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product.id)}
                    >
                      Yes
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => setConfirming(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link href={`/products/${product.id}/edit`}>
                    <MdEdit className={styles.icon} />
                  </Link>
                  <a onClick={() => setConfirming(product.id)}>
                    <MdDelete className={styles.icon} />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
