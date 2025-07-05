import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../queries';


const AddEmployee = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [className, setClassName] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [attendance, setAttendance] = useState(0);

    const [addEmployee] = useMutation(ADD_EMPLOYEE);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Adding employee:", { name, age, className, subjects, attendance });
            // Call the mutation to add employee
            await addEmployee({
                variables: { name, age: parseInt(age), class: className, subjects, attendance }
            });
            window.alert("Employee added successfully");
            // Reset form fields
            setName('');
            setAge('');
            setClassName('');
            setSubjects([]);
            setAttendance(0);
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <>
            <div className="container mt-4">
                <h3>Add Employee</h3>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Class</label>
                    <input
                        type="text"
                        className="form-control"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Subjects</label>
                    <input
                        type="text"
                        className="form-control"
                        value={subjects}
                        onChange={(e) => setSubjects(e.target.value.split(','))} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Attendance</label>
                    <input
                        type="number"
                        className="form-control"
                        value={attendance}
                        onChange={(e) => setAttendance(parseInt(e.target.value))} />
                </div>

                <button className="btn btn-primary" onClick={handleSubmit}>Add Employee</button>
            </div>
        </>
    );
};
export default AddEmployee;
