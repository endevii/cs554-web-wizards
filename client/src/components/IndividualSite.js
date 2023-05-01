import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Chat from './Chat';

function IndividualSite() {
  let { id } = useParams();
  const [currentSiteId] = useState(id);
  const [siteData, setSiteData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSite = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/site/${currentSiteId}`
      );
      setSiteData(data);
      setLoading(false);
    };
    getSite();
  }, [currentSiteId]);

  const [uid, setUid] = useState(null);
  const [uidLoading, setUidLoading] = useState(true);
  let auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setUidLoading(false);
      } else {
        setUidLoading(false);
      }
    });
  }, [auth]);

  if (!loading && !uidLoading && siteData) {
    return (
      <div className='wrapper'>
        <h1 className='grid-item title'>
          {siteData.name}
          <br />
          <Link to='/sites' className='button'>
            All Sites
          </Link>
        </h1>
        <div className='grid-item image'>
          <img src={siteData.image} className='card-img-top' alt='location' />
        </div>
        <div className='grid-item address'>
          <h2>Location:</h2>
          <ul>
            <li>Borough: {siteData.borough}</li>
            <li>
              Address: {siteData.address}, {siteData.location.city},{' '}
              {siteData.location.state}, {siteData.location.zipCode}
            </li>
          </ul>
        </div>
        <div className='grid-item facts'>
          <h2>Quick Facts</h2>
          <ul>
            <li>
              {siteData.name} is open {siteData.hours.days} from{' '}
              {siteData.hours.time}
            </li>
            {!siteData.reveiws ? (
              <li>This location has yet to be reviewed by anyone</li>
            ) : (
              <li>
                It has a rating of {siteData.rating} out of{' '}
                {siteData.reviews.length} reviews
              </li>
            )}
            <li>
              Find more information <Link to={siteData.website}>here</Link>
            </li>
          </ul>
        </div>
        <div className='grid-item description'>
          <h2>Description</h2>
          <ul id='description-list'>
            {siteData.description.map((line) => (
              <li>{line}</li>
            ))}
          </ul>
        </div>
        {uid ? (
          <div className='grid-item reviews'>
            <h2>Reviews</h2>
            <ul id='reviewList'></ul>
          </div>
        ) : (
          <div className='grid-item reviews'>Login to see reviews</div>
        )}
        {uid ? (
          <div className=' grid-item chat'>
            <Chat thisRoom={siteData.name}></Chat>
          </div>
        ) : (
          <div className='grid-item chat'>Login to join the chat</div>
        )}
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }
}

export default IndividualSite;
