import styles from "../../../styles/edit.module.css";
import { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../../../lib/api";
import { useRouter } from "next/router";

const defaultModel = {
  name: "",
  brand: "",
  img: "",
  price: 0,
  stock: 0,
};

export default function EditPage({ ssrProduct }) {
  const router = useRouter();
  const id = router.query;
  const [product, setProduct] = useState(ssrProduct);
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

  const handleSubmit = async () => {
    product.id = id.id;
    const response = await updateProduct(product);
    setProduct(defaultModel);
    router.push(`/products/${response.id}`);
  };

  return (
    <div className={styles.bg}>
      <center>
        <div className={styles.formContainer}>
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
                  placeholder="Enter brand..."
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
                  placeholder="Enter image URL..."
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
                  placeholder="Enter price..."
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
                  placeholder="Enter stock..."
                  className={styles.input}
                  onChange={handleChange}
                  value={product.stock}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}></div>
            </div>
            <div className={styles.row}></div>
          </form>
          <div className={styles.row}>
            <button onClick={handleSubmit} className={styles.button}>
              Save
            </button>
          </div>
          {error && (
            <div className={styles.error}>
              A user with this username already exists!
            </div>
          )}
        </div>
      </center>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const ssrProduct = await getProductById(id);
  return { props: { ssrProduct } };
}
