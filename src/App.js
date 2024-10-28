import React, { useState } from 'react';
import './App.css';

const gradingTable = {
  20: {
    8: 1, 9: 1.5, 10: 2, 11: 2.33, 12: 2.67,
    13: 3, 14: 3.33, 15: 3.67, 16: 4, 17: 4,
    18: 4, 19: 4, 20: 4,
  },
  40: {
    16: 2, 17: 2.5, 18: 3, 19: 3.5,
    20: 4, 21: 4.33, 22: 4.67, 23: 5, 24: 5.33,
    25: 5.67, 26: 6, 27: 6.33, 28: 6.67, 29: 7,
    30: 7.33, 31: 7.67, 32: 8, 33: 8, 34: 8, 35: 8, 36: 8,
    37: 8, 38: 8, 39: 8, 40: 8,
  },
  60: {
    24: 3, 25: 3.5, 26: 4, 27: 4.5, 28: 5,
    29: 5.5, 30: 6, 31: 6.33, 32: 6.67,
    33: 7, 34: 7.33, 35: 7.67, 36: 8, 37: 8.33,
    38: 8.67, 39: 9, 40: 9.33, 41: 9.67, 42: 10,
    43: 10.33, 44: 10.67, 45: 11, 46: 11.33,
    47: 11.67, 48: 12, 49: 12, 50: 12, 51: 12, 52: 12,
    53: 12, 54: 12, 55: 12, 56: 12, 57: 12, 58: 12, 59: 12, 60: 12,
  },
  80: {
    32: 4, 33: 4.5, 34: 5, 35: 5.5, 36: 6,
    37: 6.5, 38: 7, 39: 7.5, 40: 8, 41: 8.33,
    42: 8.67, 43: 9, 44: 9.33, 45: 9.67,
    46: 10, 47: 10.33, 48: 10.67, 49: 11,
    50: 11.33, 51: 11.67, 52: 12, 53: 12.33,
    54: 12.67, 55: 13, 56: 13.33, 57: 13.67,
    58: 14, 59: 14.33, 60: 14.67, 61: 15, 62: 15.33, 63: 15.67,
    64: 16, 65: 16, 66: 16, 67: 16, 68: 16, 69: 16, 70: 16, 71: 16,
    72: 16, 73: 16, 74: 16, 75: 16, 76: 16, 77: 16, 78: 16, 79: 16,
    80: 16,
   
  },
  100: {
    40: 5, 41: 5.5, 42: 6, 43: 6.5, 44: 7,
    45: 7.5, 46: 8, 47: 8.5, 48: 9, 49: 9.5,
    50: 10, 51: 10.33, 52: 10.67, 53: 11,
    54: 11.33, 55: 11.67, 56: 12, 57: 12.33,
    58: 12.67, 59: 13, 60: 13.33, 61: 13.67,
    62: 14, 63: 14.33, 64: 14.67, 65: 15, 66: 15.33, 67: 15.67, 68: 16,
    69: 16.33, 70: 16.67, 71: 17, 72: 17.33, 73: 17.67, 74: 18, 75: 18.33,
    76: 18.67, 77: 19, 78: 19.33, 79: 19.67, 80: 20, 81: 20, 82: 20,
     83: 20, 84: 20, 85: 20, 86: 20, 87: 20, 88: 20, 89: 20,
     90: 20, 91: 20, 92: 20, 93: 20, 94: 20, 95: 20, 96: 20,
     97: 20, 98: 20, 99: 20, 100: 20,
  },
};

function App() {
  const [subjects, setSubjects] = useState([]);
  const [gpa, setGPA] = useState(0);
  const [currentSubject, setCurrentSubject] = useState({ name: '', creditHours: 1, totalMarks: 20, obtainedMarks: 0 });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (field, value) => {
    setCurrentSubject({ ...currentSubject, [field]: value });
  };

  const getQualityPoint = (totalMarks, obtainedMarks) => {
    const points = gradingTable[totalMarks];
    return points ? points[obtainedMarks] || 0 : 0;
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedSubjects = [...subjects];
      updatedSubjects[editIndex] = currentSubject;
      setSubjects(updatedSubjects);
      setEditIndex(null);
    } else {
      setSubjects([...subjects, currentSubject]);
    }
    resetFields();
  };

  const resetFields = () => {
    setCurrentSubject({ name: '', creditHours: 1, totalMarks: 20, obtainedMarks: 0 });
  };

  const handleEdit = (index) => {
    setCurrentSubject(subjects[index]);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCreditHours = 0;

    subjects.forEach(({ creditHours, totalMarks, obtainedMarks }) => {
      const qualityPoint = getQualityPoint(totalMarks, obtainedMarks);
      totalQualityPoints += qualityPoint;
      totalCreditHours += creditHours;
    });

    setGPA(totalCreditHours ? totalQualityPoints / totalCreditHours : 0);
  };

  return (
    <div>
    <div class="aurora-background"></div>
    <div className="container">
      <h2>GPA CALCULATOR</h2>
      <form className="gpa-form">
        <label>Subject Name:</label>
        <input
          type="text"
          value={currentSubject.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
         <br></br>
        <label>Credit Hours:</label>
        <select
          value={currentSubject.creditHours}
          onChange={(e) => handleChange('creditHours', Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((creditHour) => (
            <option key={creditHour} value={creditHour}>{creditHour}</option>
          ))}
        </select>
          <br></br>
        <label>Total Marks:</label>
        <select
          value={currentSubject.totalMarks}
          onChange={(e) => handleChange('totalMarks', Number(e.target.value))}
        >
          {[20, 40, 60, 80, 100].map((marks) => (
            <option key={marks} value={marks}>{marks}</option>
          ))}
        </select>
           <br></br>
        <label>Obtained Marks:</label>
        <input
          type="number"
          value={currentSubject.obtainedMarks}
          onChange={(e) => handleChange('obtainedMarks', Number(e.target.value))}
        />

        <div className="buttons">
          <button type="button" onClick={handleAddOrUpdate}>
            {editIndex !== null ? 'Update Subject' : 'Add Subject'}
          </button>
          <button type="button" onClick={calculateGPA}>Calculate GPA</button>
        </div>
      </form>

      <h3>Your GPA: {gpa.toFixed(2)}</h3>

      <h4>Subject List</h4>
      <ul className="subject-list">
        {subjects.map((subject, index) => (
          <li key={index}>
            <strong>{subject.name}</strong> - Credit Hours: {subject.creditHours}, Total Marks: {subject.totalMarks}, 
            Obtained Marks: {subject.obtainedMarks}, Quality Points: {getQualityPoint(subject.totalMarks, subject.obtainedMarks)}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
