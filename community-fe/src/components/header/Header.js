import { React, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import Nav from './nav/Nav'

function Header() {
  const imageUrl = '/title.png'
  const { pathname } = useLocation();
  const [profile, setProfile] = useState(false);
  useEffect(function profile() {
    if(pathname === '/') {
      setProfile(false);
    } else if(pathname === '/signup'){
      setProfile(false);
    } else {
      setProfile(true);
    }
  }, [pathname])

  return (
      <header className={styles.header}>
        <div className={styles.header_wrapper}>
          <div className={styles.header_title}>
            <Link to={"/home"}>
              <img src={imageUrl} alt="mainTitle"/>
            </Link>
          </div>
          {profile && <Nav />}
        </div>
      </header>
  );
}

export default Header;