import React, { useState } from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

function KanbanBoard({ tickets, groupBy, sortBy }) {
  // State to manage tickets and new ticket input
  const [ticketList, setTicketList] = useState(tickets);
  const [newTicket, setNewTicket] = useState({
    title: '',
    group: '',
    priority: 1,
  });
  const [showAddTicketInput, setShowAddTicketInput] = useState({});

  // Group tickets based on the groupBy criteria
  const groupTickets = () => {
    const groups = {};
    ticketList.forEach(ticket => {
      const key = ticket[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
    });

    // Sort tickets within each group
    for (const key in groups) {
      groups[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority; // Sort by numeric priority level (higher first)
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groups;
  };

  const groupedTickets = groupTickets();

  // Handle input changes for the new ticket
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prevTicket => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  // Add new ticket to the list
  const handleAddTicket = (group) => {
    const newTicketData = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTicket.title,
      [groupBy]: group,  // Use the groupBy field
      priority: parseInt(newTicket.priority, 10),
    };
    setTicketList(prevTickets => [...prevTickets, newTicketData]);
    setNewTicket({ title: '', group: '', priority: 1 });
    setShowAddTicketInput(prev => ({ ...prev, [group]: false }));
  };

  // Update existing ticket
  const handleUpdateTicket = (updatedTicket) => {
    setTicketList(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  // Toggle visibility of the add ticket input
  const toggleAddTicketInput = (group) => {
    setShowAddTicketInput(prev => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="kanban-board">
      {/* Render the grouped tickets */}
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="kanban-column">
          <div className="column-header">
            <h3>{group}</h3>
            <div className="button-group">
              <button
                className="add-ticket-button"
                onClick={() => handleAddTicket(group)}
              >
                +
              </button>
              <button
                className="toggle-add-ticket-button"
                onClick={() => toggleAddTicketInput(group)}
              >
                ...
              </button>
            </div>
          </div>
          {groupedTickets[group].map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onUpdate={handleUpdateTicket}
            />
          ))}
          {showAddTicketInput[group] && (
            <div className="add-ticket-inputs">
              <input
                type="text"
                name="title"
                value={newTicket.title}
                onChange={handleInputChange}
                placeholder="New ticket title"
              />
              <input
                type="number"
                name="priority"
                value={newTicket.priority}
                onChange={handleInputChange}
                placeholder="Priority"
              />
              <button
                className="confirm-add-button"
                onClick={() => handleAddTicket(group)}
              >
                Add Ticket
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
