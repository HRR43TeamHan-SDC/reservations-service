import Reservation from './Reservation.jsx';

const ReactDOM = require('react-dom');
const React = require('react');
// line 6, 11, 14 commented out to resolve pm2 isssues; to fix using a query string
// const queryString = window.location.search;
const urlParams = window.location.pathname.split('/');
const id = urlParams[1];


// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get('id');

console.log(id);
ReactDOM.render(
  <Reservation restaurantId={id} />,
  document.getElementById('reservations'),
);
