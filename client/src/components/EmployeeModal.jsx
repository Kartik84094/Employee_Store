import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EMPLOYEE } from '../queries';
import { getRole } from '../auth';

const EmployeeModal = ({ employee, onClose }) => {
    const role = getRole();
    const [form, setForm] = useState({ ...employee });
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        onCompleted: onClose
    });

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'age' || name === 'attendance') {
            // Convert age and attendance to numbers
            setForm(prev => ({ ...prev, [name]: Number(value) }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {

        updateEmployee({ variables: { id: employee.id, ...form } });
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: '#00000066' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Employee Detail</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {['name', 'age', 'class', 'subjects', 'attendance'].map(field => (
                            <div className="mb-3" key={field}>
                                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    name={field}
                                    className="form-control"
                                    value={form[field] || ''}
                                    onChange={handleChange}
                                    readOnly={role !== 'admin'}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        {role === 'admin' && <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;
