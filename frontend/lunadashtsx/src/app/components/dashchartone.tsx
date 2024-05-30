'use client';

import Styles from "@/app/dashboard/styles.module.scss"

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ChartOptions, 
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashChartOneTS {
  payperiod: string;
  netpayroll: string;
  tax_owed: string;
  totalexpenses: string;
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top' as 'top', // Explicitly cast the position to 'top'
      },
      title: {
        display: true,
        text: 'Weekly Expenses Report',
      },
    },
  };  

const DashChartOne: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/dashchartone/');
      const data: DashChartOneTS[] = await response.json();

      const payPeriods = data.map(item => item.payperiod);
      const netPayrolls = data.map(item => parseFloat(item.netpayroll));
      const taxOwed = data.map(item => parseFloat(item.tax_owed));
      const totalExpenses = data.map(item => parseFloat(item.totalexpenses));

      setChartData({
        labels: payPeriods,
        datasets: [
          {
            label: 'Net Payroll',
            data: netPayrolls,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Tax Owed',
            data: taxOwed,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Total Expenses',
            data: totalExpenses,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div className={Styles.chartContainer}>
      <Bar options={options} data={chartData} />
    </div>
)};

export default DashChartOne;
