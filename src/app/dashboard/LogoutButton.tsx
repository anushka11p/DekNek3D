"use client";

import { signOut } from "next-auth/react";
import styles from "./dashboard.module.css";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className={styles.logoutButton}>
      Log Out
    </button>
  );
}
