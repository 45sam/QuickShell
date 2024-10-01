import React from 'react';
import './TicketCard.css';

function TicketCard({ ticket, onUpdate }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        <div className="ticket-user-avatar">AS</div>
      </div>
      <h4 className="ticket-title">{ticket.title}</h4>
      <div className="ticket-footer">
        <div className="ticket-tag">Feature Request</div>
      </div>
    </div>
  );
}

export default TicketCard;
