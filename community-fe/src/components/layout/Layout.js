import { Outlet } from 'react-router-dom';
import Header from '../header/Header'
import styles from './Layout.css'

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;