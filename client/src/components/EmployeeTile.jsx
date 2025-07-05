import React from 'react';
import { getRole } from '../auth';

const EmployeeTile = ({ employee, onSelect, onDelete, onFlag }) => {
    const role = getRole();

    return (
        <div className="card m-2 position-relative" style={{ width: '18rem' }}>
            <div className="card-body" onClick={() => onSelect(employee)} style={{ cursor: 'pointer' }}>
                <h5 className="card-title">{employee.name}</h5>
                <p className="card-text">
                    Age: {employee.age}<br />
                    Class: {employee.class}<br />
                    Subjects: {employee.subjects?.join(', ')}<br />
                </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-primary" onClick={() => onFlag(employee.id, employee.flagged)} disabled={role !== 'admin'}>{employee.flagged ? 'Flag' : 'Unflag'}</button>
                <button className="btn btn-sm btn-secondary" onClick={() => onSelect(employee)}>View</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(employee.id)} disabled={role !== 'admin'}>Delete</button>
            </div>
        </div>
    );
};


export default EmployeeTile;
