"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import LunaLogo from './public/lunalogo.png'

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.access) {
      document.cookie = `token=${data.access}; path=/`;
      document.cookie = `refresh=${data.refresh}; path=/`;
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div id={styles.loginContainer}>
      <div id={styles.formContainer}>
        <Image src={LunaLogo} alt='Luna Logo' width={225} height={225} />
        <h1 id={styles.loginHeader}>
          Payroll Dashboard
        </h1>
        <form id={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id={styles.loginBtn} type="submit">
            Login
          </button>
          <Link style={{ color: "orange" }} href="/dashboardemo">
            Try The Demo
          </Link>
        </form>
        <ul>
          <li className={styles.loginLI}>Punch in crew member hours</li>
          <li className={styles.loginLI}>Crew member and project payroll details</li>
          <li className={styles.loginLI}>Bar graphs for data visualization</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
