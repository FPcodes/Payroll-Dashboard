"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.scss";

interface Employee {
  empl_id: number;
  firstname: string;
}

interface Project {
  project_id: number;
  projectname: string;
}

interface FormField {
  employee: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  totalhours: number;
}

export default function HourSubmission() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      employee: "",
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      totalhours: 0,
    },
  ]);

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch("http://127.0.0.1:8000/employees/");
    const data = await response.json();
    setEmployees(data);
  };

  const fetchProjects = async () => {
    const response = await fetch("http://127.0.0.1:8000/projects/");
    const data = await response.json();
    setProjects(data);
  };

  const handleAddFields = () => {
    setFormFields([
      ...formFields,
      {
        employee: "",
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        totalhours: 0,
      },
    ]);
  };

  const handleFormChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const data = [...formFields];
    data[index] = {
      ...data[index],
      [name]: name === "employee" ? value : parseFloat(value),
    } as FormField;
    setFormFields(data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formFields);
    // Add your form submission logic here
  };

  return (
    <div id={styles.hoursContainer}>
      <h1>Hours Submission</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.topFormInfo}>
          <label>Pay Period:</label>
          <input type="date" name="payperiod" />
          <label>Choose Project Site:</label>
          <select name="project">
            {projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                {project.projectname} (ID: {project.project_id})
              </option>
            ))}
          </select>
        </div>
        {formFields.map((formField, index) => (
          <div className={styles.lowerFormInfo} key={index}>
            <div className={styles.emplInfo}>
            <label>Select Employee: </label>
            <select
              name="employee"
              value={formField.employee}
              onChange={(event) => handleFormChange(index, event)}
            >
              {employees.map((employee) => (
                <option key={employee.empl_id} value={employee.empl_id}>
                  {employee.firstname} (ID: {employee.empl_id})
                </option>
              ))}
            </select>
            </div>
            {(
              [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
                "totalhours",
              ] as const
            ).map((day) => (
              <div className={styles.daysInputs} key={day}>
                <label>{day.charAt(0).toUpperCase() + day.slice(1)}: </label>
                <input
                  type="number"
                  name={day}
                  value={formField[day]}
                  min="1"
                  max="12"
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
            ))}
          </div>
        ))}
        <button id={styles.addEmplBtn} type="button" onClick={handleAddFields}>
          Add Employee+
        </button>
        <button id={styles.submitBtn} type="submit">Submit</button>
      </form>
    </div>
  );
}
