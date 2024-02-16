import React from 'react';

function ParkingStatus() {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="/assets/smile_emozi.png" className="card-img-top" alt="image" />
      {/* <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div> */}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>

      </ul>
    </div>
  );
}

export default ParkingStatus;
