import React from "react";
import styles from "../styles/Footer.module.css";
import { useSession } from "next-auth/react";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";
import { AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { createMessage } from "../lib/api";

const defaultModel = { username: "", message: "", createdAt: "" };

export default function Footer() {
  const { data: session } = useSession();
  const [message, setMessage] = useState(defaultModel);

  const handleSubmit = async () => {
    const response = await createMessage(message);
    setMessage(defaultModel);
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;
    setMessage({
      ...message,
      [name]: value,
    });
  };

  return (
    <div>
      <div className={styles.sectionContainer}>
        <div className={styles.leftPane}>
          <div className={styles.contentContainer}>
            <h4 className={styles.footerTitle}>
              <span style={{ color: "#5CDB95" }}>Ascend</span>
            </h4>
            <p className={styles.footerText}>
              This Website was made for an educational purpose. We made this
              Project in our apprenticeship in the Bbc.
            </p>
            <p className={styles.footerText}>
              <MdEmail style={{ height: "25px", width: "25px" }}></MdEmail>
              info@ascend.com
            </p>
            <p className={styles.footerText}>
              <MdOutlinePhoneIphone
                style={{ height: "25px", width: "25px", marginTop: "0.2em" }}
              ></MdOutlinePhoneIphone>
              078 123 45 67
            </p>
          </div>
        </div>

        <div className={styles.middlePane}>
          <div className={styles.contentContainer}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <Link href={`http://localhost:3000/impressum`} passHref>
              <div>
                <span className={styles.footerLink}>Impressum</span>
              </div>
            </Link>
            <a target="_blank" href="https://github.com/maettu999" passHref>
              <AiOutlineGithub
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  color: "#edf5e1",
                  marginTop: "0.5em",
                }}
              ></AiOutlineGithub>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/_.levin._96._/"
              passHref
            >
              <AiOutlineInstagram
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  marginLeft: "0.1em",
                  color: "#edf5e1",
                  marginTop: "0.5em",
                }}
              ></AiOutlineInstagram>
            </a>
          </div>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.contentContainer}>
            <h4 className={styles.footerTitle}>Contact us</h4>
            {session ? (
              <textarea
                className={styles.textarea}
                name="message"
                id="text"
                placeholder="Enter message..."
                value={message.message}
                onChange={handleChange}
              ></textarea>
            ) : (
              <p className={styles.footerText}>
                <Link href={`http://localhost:3000/auth/signIn`} passHref>
                  <a className={styles.footerLink2}>Sign in Here</a>
                </Link>{" "}
                to contact us or send Feedback
              </p>
            )}
            {session && (
              <button onClick={handleSubmit} className={styles.button}>
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
