import styles from "../styles/impressum.module.css";
import Model from "../components/Model";

export default function ImpressumPage() {
  return (
    <div className={styles.container}>
      <center>
        <h1 className={styles.header}>Impressum</h1>
        <h2 className={styles.subheader}>About this project</h2>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            This is a project we made in the Bbc. The whole application is
            written in JavaScript, using NextJs
          </p>
        </div>
        <h2 className={styles.subheader}>Links</h2>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            <a className={styles.link} href="https://restocks.net">
              restocks
            </a>
            : All product-images are from the restocks website.
          </p>
        </div>
      </center>
      <div className={styles.modelContainer}>
        <Model />
      </div>
    </div>
  );
}
