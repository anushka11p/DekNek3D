import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import styles from "./dashboard.module.css";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch some user data from DB using the session ID
  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { name: true, email: true, createdAt: true },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard</h1>
          <nav className={styles.nav}>
            <Link href="/" className={styles.homeLink}>Home</Link>
            <LogoutButton />
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <h2>Welcome back, {user.name || "User"}!</h2>
          <p>We're glad to see you again. Here is your account overview.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Profile Details</h3>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{user.name || "Not provided"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Member Since</span>
                <span className={styles.value}>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Recent Activity</h3>
            <div className={styles.emptyState}>
              <p>No recent activity to show.</p>
              <button className={styles.actionButton}>Explore Features</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
