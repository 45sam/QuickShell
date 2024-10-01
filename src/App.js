import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import GroupingOrdering from './GroupingOrdering';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  // Fetch tickets from the API
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setTickets(data.tickets))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  // Save grouping and sorting preferences to localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="app">
      {/* Grouping and Ordering controls */}
      <GroupingOrdering
        onGroupingChange={setGroupBy}
        onOrderingChange={setSortBy}
        groupBy={groupBy}
        sortBy={sortBy}
      />

      {/* Kanban Board with tickets */}
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
