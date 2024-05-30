import styles from './styles.module.scss';
import Link from 'next/link';

export default function Login() {
  return (
    <div id={styles.loginContainer}>
      <h1>Luna NYC Electric Dashboard Login</h1>
      <label>Username: </label>
      <input type="text" style={{ border: '1px black solid' }}></input>
      <label>Password: </label>
      <input type="text" style={{ border: '1px black solid' }}></input>
      <Link href="/about" legacyBehavior><a>Try The Demo</a></Link>
    </div>
  );
}