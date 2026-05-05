import Link from "next/link";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
        DekNek3D <span className={styles.gradientText}></span>
        </h1>
        <p className={styles.description}>
          full-stack Next.js application with secure authentication, modern database integration.
        </p>

        <div className={styles.actions}>
          {session ? (
            <Link href="/dashboard" className={styles.primaryButton}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className={styles.primaryButton}>
                Log In
              </Link>
              <Link href="/signup" className={styles.secondaryButton}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3>Secure Authentication</h3>
          <p>Using NextAuth.js with bcrypt password hashing for ultimate security.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Modern Tech Stack</h3>
          <p>Using Next.js App Router, Server Actions, and a responsive vanilla CSS design.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Database Integration</h3>
          <p>Using Prisma ORM connected to SQLite for seamless data management and querying.</p>
        </div>
      </div>
    </main>
  );
}
