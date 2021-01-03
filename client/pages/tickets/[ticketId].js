import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

function TicketShow({ ticket }) {
  const { doRequest, errors, success } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => {
      console.log(order);
    },
  });

  useEffect(() => {
    if (success) {
    }
  }, [success]);

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={doRequest} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
