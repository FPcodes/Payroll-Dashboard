import DashChartOne from '@/app/components/dashchartone';
import DashtableOne from '@/app/components/dashtableone';
import DashtableTwo from '@/app/components/dashtabletwo';
import styles from './styles.module.scss';

export default function Dashboard() {
  return (
    <div id={styles.dashContainer}>
          <DashtableOne />
          <DashtableTwo />
          <DashChartOne />
    </div>
  );
}

