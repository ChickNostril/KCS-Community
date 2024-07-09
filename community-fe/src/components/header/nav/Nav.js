import styles from './Nav.module.css';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };
    fetchUser();
  }, []);

  const [modal, setModal] = useState(false);
  const openModal = () => {
    modal === true ? setModal(false) : setModal(true);
  }
  return (
<nav className={styles.nav}>
      {user && (
        <div className={styles.userIcon} onClick={openModal}>
          {user.profile_image && 
            <img 
              className={styles.image} 
              src={`http://localhost:3001${user.profile_image}`} 
              alt="Profile" 
            />
          }
        </div>
      )}
      {modal && <Modal />}
    </nav>
  );
}

export default Nav;