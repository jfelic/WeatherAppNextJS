import Weather from "./Weather.js";
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <div>
        <Weather/>
      </div>
    </main>
  );
}
