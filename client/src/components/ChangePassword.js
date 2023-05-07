import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from 'firebase/auth';
import '../App.css';

function ChangePassword() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchPassword, setMatchPassword] = useState('');
  let auth = getAuth();

  let user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [auth]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const { currentPassword, newPasswordOne, newPasswordTwo } =
      event.target.elements;
    console.log(currentPassword);

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setMatchPassword('Passwords do not match!');
      return false;
    }

    let credential = EmailAuthProvider.credential(email, currentPassword);

    try {
      await reauthenticateWithCredential(auth, credential);
      await updatePassword(newPasswordOne);
      signOut(auth);
      alert('Password has been changed, you will be logged out');
    } catch (error) {
      alert(error);
    }
  };

  if (user) {
    return (
      <div>
        {matchPassword && <h4 className='error'>{matchPassword}</h4>}
        <h2>Change Password</h2>
        <form onSubmit={handleSubmitForm}>
          <div className='form-group'>
            <label>
              Current Password:
              <input
                className='form-control'
                name='currentPassword'
                id='currentPassword'
                type='password'
                placeholder='Current Password'
                autoComplete='off'
                required
              />
            </label>
          </div>

          <div className='form-group'>
            <label>
              New Password:
              <input
                className='form-control'
                name='newPasswordOne'
                id='newPasswordOne'
                type='password'
                placeholder='Password'
                autoComplete='off'
                required
              />
            </label>
          </div>
          <div className='form-group'>
            <label>
              Confirm New Password:
              <input
                className='form-control'
                name='newPasswordTwo'
                id='newPasswordTwo'
                type='password'
                placeholder='Confirm Password'
                autoComplete='off'
                required
              />
            </label>
          </div>

          <button type='submit'>Change Password</button>
        </form>
        <br />
      </div>
    );
  }
}

export default ChangePassword;
