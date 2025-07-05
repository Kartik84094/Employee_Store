import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES_PAGINATED } from '../queries';
import EmployeeTile from './EmployeeTile';
import EmployeeModal from './EmployeeModal';
import { DELETE_EMPLOYEE, FLAG_EMPLOYEE } from '../queries';
import { useMutation } from '@apollo/client';

const EmployeeGrid = () => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const limit = 8;

    const [view, setView] = useState('grid');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: ['ListEmployees']
    });
    const [flagEmployee] = useMutation(FLAG_EMPLOYEE, {
        refetchQueries: ['ListEmployees']
    });

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            await deleteEmployee({ variables: { id } });
        }
    };

    const handleFlag = async (id, flagged) => {
        console.log("Toggling flag for employee:", id, "Current flagged state:", flagged);
        if (window.confirm(`Are you sure you want to ${flagged ? 'unflag' : 'flag'} this employee?`)) {
            // Call the mutation to flag/unflag employee
            console.log("Calling flagEmployee mutation with id:", id, "and flagged state:", !flagged);
            await flagEmployee({ variables: { id, flagged: !flagged } });
        }
    };



    const { loading, data, error } = useQuery(GET_EMPLOYEES_PAGINATED, {
        variables: { page, limit, sortBy, order }
    });

    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>Error loading employees.</p>;

    const { employees, currentPage, totalPages } = data.listEmployees;

    const handleSort = (field) => {
        if (sortBy === field) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setOrder('asc');
        }
    };

    return (
        <div className="container mt-4">
            <h3>Employee Grid</h3>

            <div className="mb-3 d-flex justify-content-between align-items-center">
                <button className="btn btn-sm btn-primary me-2" onClick={() => setView(view === 'grid' ? 'tile' : 'grid')}>
                    Switch to {view === 'grid' ? 'Tile' : 'Grid'} View
                </button>
                <div className='d-flex align-items-center'>
                    <button className="btn btn-sm btn-primary mx-1" onClick={() => handleSort('name')}>Sort by Name</button>
                    <button className="btn btn-sm btn-primary" onClick={() => handleSort('age')}>Sort by Age</button>
                </div>
            </div>

            {view === 'grid' ? (
                <table className="table table-hover table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Class</th>
                            <th>Subjects</th>
                            <th>Attendance</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.name}</td>
                                <td>{emp.age}</td>
                                <td>{emp.class}</td>
                                <td>{emp.subjects?.join(', ')}</td>
                                <td>{emp.attendance}</td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="d-flex flex-wrap">
                    {employees.map(emp => (
                        <EmployeeTile
                            key={emp.id}
                            employee={emp}
                            onSelect={setSelectedEmployee}
                            onDelete={handleDelete}
                            onFlag={handleFlag}
                        />

                    ))}
                </div>
            )}

            <div className="d-flex justify-content-end align-items-center mt-3">
                <button className="btn btn-sm btn-primary" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                <div className='mx-2'>Page {currentPage} of {totalPages}</div>
                <button className="btn btn-sm btn-primary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>


            {selectedEmployee && (
                <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
            )}

        </div>
    );
};

export default EmployeeGrid;
