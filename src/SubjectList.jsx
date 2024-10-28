import React from 'react';

const SubjectList = ({ subjects, removeSubject }) => {
    return (
        <ul>
            {subjects.map((subject) => (
                <li key={subject.id}>
                    {subject.name} - {subject.creditHours} Credit Hour(s) - {subject.totalMarks} Total Marks
                    <button onClick={() => removeSubject(subject.id)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default SubjectList;
