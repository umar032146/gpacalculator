import React, { useState } from 'react';

const SubjectForm = ({ addSubject }) => {
    const [name, setName] = useState('');
    const [creditHours, setCreditHours] = useState(1);
    const [totalMarks, setTotalMarks] = useState(20);

    const handleSubmit = (e) => {
        e.preventDefault();
        addSubject({ id: Date.now(), name, creditHours, totalMarks });
        setName('');
        setCreditHours(1);
        setTotalMarks(20);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Subject Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <select 
                value={creditHours} 
                onChange={(e) => setCreditHours(Number(e.target.value))} 
            >
                {[1, 2, 3, 4, 5].map((ch) => (
                    <option key={ch} value={ch}>{ch} Credit Hour(s)</option>
                ))}
            </select>
            <select 
                value={totalMarks} 
                onChange={(e) => setTotalMarks(Number(e.target.value))} 
            >
                {[20, 40, 60, 80, 100].map((marks) => (
                    <option key={marks} value={marks}>{marks} Total Marks</option>
                ))}
            </select>
            <button type="submit">Add Subject</button>
        </form>
    );
};

export default SubjectForm;
