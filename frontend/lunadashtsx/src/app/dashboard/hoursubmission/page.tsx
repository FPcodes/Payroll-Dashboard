'use client'

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import withAuth from '../../components/withAuth';
import styles from './styles.module.scss';

type Project = {
  project_id: number;
  projectname: string;
};

type Employee = {
  empl_id: number;
  firstname: string;
};

type FormValues = {
  project: number;
  empl: number;
  payperiod: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  totalhours: number;
};

function HoursSubmissionPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/hoursapi/projects/');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log('Projects:', data); // Debug log
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/hoursapi/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        console.log('Employees:', data); // Debug log
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/');
      return;
    }

    const tokenValue = token.split('=')[1];

    try {
      const response = await fetch('http://127.0.0.1:8000/hoursapi/officialhoursubmission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenValue}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div id={styles.hoursContainer}>
      <h1>Submit Hours</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('project')} defaultValue="">
          <option value="" disabled>Select a Project</option>
          {projects.map((project) => (
            <option key={project.project_id} value={project.project_id}>{project.projectname}</option>
          ))}
        </select>
        {errors.project && <span>This field is required</span>}

        <select {...register('empl')} defaultValue="">
          <option value="" disabled>Select an Employee</option>
          {employees.map((employee) => (
            <option key={employee.empl_id} value={employee.empl_id}>{employee.firstname}</option>
          ))}
        </select>
        {errors.empl && <span>This field is required</span>}

        <input type="date" {...register('payperiod')} />
        {errors.payperiod && <span>This field is required</span>}

        <input type="number" step="0.1" {...register('monday')} placeholder="Monday Hours" />
        <input type="number" step="0.1" {...register('tuesday')} placeholder="Tuesday Hours" />
        <input type="number" step="0.1" {...register('wednesday')} placeholder="Wednesday Hours" />
        <input type="number" step="0.1" {...register('thursday')} placeholder="Thursday Hours" />
        <input type="number" step="0.1" {...register('friday')} placeholder="Friday Hours" />
        <input type="number" step="0.1" {...register('saturday')} placeholder="Saturday Hours" />
        <input type="number" step="0.1" {...register('sunday')} placeholder="Sunday Hours" />
        <input type="number" step="0.1" {...register('totalhours')} placeholder="Total Hours" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default withAuth(HoursSubmissionPage);
