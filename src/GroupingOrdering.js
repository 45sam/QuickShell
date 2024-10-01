import React, { useState } from 'react';
import './KanbanBoard.css'; // Import the CSS we created

const GroupingOrdering = ({ onGroupingChange, onOrderingChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleGroupingChange = (event) => {
    onGroupingChange(event.target.value);
  };

  const handleOrderingChange = (event) => {
    onOrderingChange(event.target.value);
  };

  return (
    <div className="display-container">
      <button
        className="display-button"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        Display
      </button>
      <div className={`dropdown-container ${isDropdownVisible ? 'active' : ''}`}>
        <div className="dropdown-item">
          <label htmlFor="grouping">Grouping</label>
          <select id="grouping" onChange={handleGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="dropdown-item">
          <label htmlFor="ordering">Ordering</label>
          <select id="ordering" onChange={handleOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GroupingOrdering;
