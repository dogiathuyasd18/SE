// AccountPage.jsx
import React from 'react';
import './Account.css';

const AccountPage = () => {
  const user = {
    name: 'Imran Khan',
    registrationDate: '17th May 2022',
    email: 'tarek97.ta@gmail.com',
    phone: '+000 11122 2345 657',
    address: 'Bangladesh Embassy, Washington, DC 20008',
    profilePicture: 'https://via.placeholder.com/100',
  };

  const items = [
    {
      id: 1,
      name: 'Coffee Beans - Espresso Arabica and Robusta Beans',
      price: '$47.00',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Lavazza Coffee Blends - Try the Italian Espresso',
      price: '$53.00',
      image: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <div className="account-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <img src={user.profilePicture} alt={user.name} className="profile-picture" />
          <h3>{user.name}</h3>
          <p>Registered: {user.registrationDate}</p>
        </div>
        <nav className="navigation">
          <h4>Manage Account</h4>
          <ul>
            <li>Personal info</li>
            <li>Addresses</li>
            <li>Communications & privacy</li>
          </ul>
          <h4>My items</h4>
          <ul>
            <li>Reorder</li>
            <li>Lists</li>
            <li>Registries</li>
          </ul>
          <h4>Subscriptions & plans</h4>
          <ul>
            <li>Protection plans</li>
          </ul>
          <h4>Customer Service</h4>
          <ul>
            <li>Help</li>
            <li>Terms of Use</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <section className="wallet-section">
          <h2>My Wallet</h2>
          <p>Payment methods</p>
          <div className="card-list">
            <div className="card">
              <div className="card-details">
                <p className="card-number">1234 4567 8901 2221</p>
                <p>Card Holder: Imran Khan</p>
                <p>Expires: 10/22</p>
              </div>
            </div>
            <div className="card">
              <div className="card-details">
                <p className="card-number">1234 4567 2221 8901</p>
                <p>Card Holder: Imran Khan</p>
                <p>Expires: 11/22</p>
              </div>
            </div>
            <div className="add-card">
              <span>+ Add New Card</span>
            </div>
          </div>
        </section>

        <section className="account-info">
          <h2>Account Info</h2>
          <p>Addresses, contact information, and password</p>
          <div className="info-box">
            <div className="info-item">
              <span>Email Address</span>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <span>Phone number</span>
              <p>{user.phone}</p>
            </div>
            <div className="info-item">
              <span>Add an address</span>
              <p>{user.address}</p>
            </div>
          </div>
        </section>

        <section className="lists">
          <h2>Lists</h2>
          <p>2 items - Primary</p>
          <div className="list-items">
            {items.map(item => (
              <div key={item.id} className="list-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="price">{item.price}</p>
                  <button className="add-to-cart">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
