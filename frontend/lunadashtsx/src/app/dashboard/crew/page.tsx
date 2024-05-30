import styles from './styles.module.scss';
import CrewtableOne from '@/app/components/crewtableone';

export default function Crew() {
  return (
    <div id={styles.crewContainer}>
      <h1>Luna NYC Electric Crew</h1>
      <CrewtableOne />
    </div>
  );
}