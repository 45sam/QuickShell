import React, { useState } from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

function KanbanBoard({ tickets, groupBy, sortBy }) {
  const [ticketList, setTicketList] = useState(tickets);
  const [newTicket, setNewTicket] = useState({
    title: '',
    group: '',
    priority: 1,
  });
  const [showAddTicketInput, setShowAddTicketInput] = useState({});

  const groupTickets = () => {
    const groups = {};
    ticketList.forEach(ticket => {
      const key = ticket[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
    });

    for (const key in groups) {
      groups[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groups;
  };

  const groupedTickets = groupTickets();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prevTicket => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleAddTicket = (group) => {
    const newTicketData = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTicket.title,
      group,
      priority: parseInt(newTicket.priority, 10),
    };
    setTicketList(prevTickets => [...prevTickets, newTicketData]);
    setNewTicket({ title: '', group: '', priority: 1 });
    setShowAddTicketInput(prev => ({ ...prev, [group]: false }));
  };

  const handleUpdateTicket = (updatedTicket) => {
    setTicketList(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  const toggleAddTicketInput = (group) => {
    setShowAddTicketInput(prev => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="kanban-board">
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
