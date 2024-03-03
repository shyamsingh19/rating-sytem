
import './App.css';
import Modal from 'react-modal';
import React, { useState } from 'react';
const App = () => {
  const [open, setOpen] = React.useState(false);

  const StarRating = ({ rating }) => {

    const totalStars = 5;
    const blackStars = totalStars - rating;

    return (
      <div>
        {[...Array(rating)].map((_, index) => (
          <span key={index} style={{ color: 'gold' }}>★</span>
        ))}
        {[...Array(blackStars)].map((_, index) => (
          <span key={index} style={{ color: 'black' }}>★</span>
        ))}
      </div>

    );
  };

  const UserList = ({ users, onRatingChange }) => {
    return (
      <ul className='listingbox'>


        {users.map(user => (
          <li key={user.id} onClick={() => onRatingChange(user)} className='ratinglist'>
            {user.username} <StarRating rating={user.rating} />
          </li>
        ))}
      </ul>
    );
  };

  const AddUserForm = ({ onAddUser }) => {
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState('');


    const handleAddUser = () => {
      if (username && !isNaN(rating) && rating >= 1 && rating <= 5) {
        onAddUser({ username, rating: parseInt(rating), id: Date.now() });
        setUsername('');
        setRating('');
        handleClose();
        window.alert('User added successfully!');
      }
    };

    return (
      <form className='form_wrap'>
        <h4> Add User</h4>
        <div>
          <label>
            Username:

          </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>
            Rating:

          </label>
          <input type="number" value={rating} onChange={e => setRating(e.target.value)} min="1" max="5" />
        </div>
        <div className='form_buttons'>
          <button type="button" onClick={handleClose}> cancel</button>
          <button type="button" onClick={handleAddUser}>
            Save
          </button>

        </div>
      </form>
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const [users, setUsers] = useState([
    { id: 1, username: 'John smith', rating: 4 },
    { id: 2, username: 'abhishek', rating: 2 },
    { id: 3, username: 'abhishek1', rating: 5 },
    { id: 1, username: 'John smith', rating: 4 },
    { id: 2, username: 'abhishek', rating: 2 },
    { id: 3, username: 'abhishek1', rating: 5 },

  ]);

  const handleRatingChange = user => {
    const newRating = prompt('Enter new rating:');
    if (newRating && !isNaN(newRating) && newRating >= 1 && newRating <= 5) {
      const updatedUsers = users.map(u => (u.id === user.id ? { ...u, rating: parseInt(newRating) } : u));
      setUsers(updatedUsers);
    }
  };

  const handleAddUser = newUser => {
    setUsers([...users, newUser]);

  };

  const handleSort = order => {
    const sortedUsers = [...users].sort((a, b) => (order === 'asc' ? a.rating - b.rating : b.rating - a.rating));
    setUsers(sortedUsers);
  };

  return (
    <div className='rating_wrap'>
      <div>
        <div className='button_wrap'>
          <div className='sort_button'>
            <span>Sort by :-</span> &nbsp;
            <button onClick={() => handleSort('asc')}>High Rating first</button> &nbsp; &nbsp;
            <button onClick={() => handleSort('desc')}>Lower rating first</button>
          </div>
          <button className='addnew' onClick={handleOpen}> Add New</button>
          <Modal isOpen={open} onClose={handleClose} onRequestClose={handleClose} className="modalbox">
            <div>

              <AddUserForm onAddUser={handleAddUser} />
            </div>
          </Modal>
        </div>
        <UserList users={users} onRatingChange={handleRatingChange} />
        {/* <AddUserForm onAddUser={handleAddUser} /> lets check its working or not  */}
      </div>
    </div>
  );
};

export default App;
