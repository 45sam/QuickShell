import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

function KanbanBoard({ tickets, groupBy, sortBy }) {
  const groupTickets = () => {
    const groups = {};
    tickets.forEach(ticket => {
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

  return (
    <div className="kanban-board">
      {/* Render the grouped tickets */}
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="kanban-column">
          <h3>{group}</h3>
          {groupedTickets[group].map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
