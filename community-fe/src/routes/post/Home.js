import React from 'react'
import styles from './Home.module.css'
import Cards from '../../components/card/Cards'
import { useNavigate } from 'react-router';

function Home(props) {
  const navigate = useNavigate();
  const openWrite = () => {
    navigate('/write');
  }
  return (
    <div className="page">
      <section className={styles.container}>
        <div className={styles.title}>
          <h3>
              안녕하세요,<br />
              아무 말 대잔치 <span>게시판</span> 입니다.
          </h3>
        </div>
        <div className={styles.write}>
          <button onClick={()=>{openWrite()}}>게시글 작성</button>
        </div>
        <Cards posts={props.posts}/>
      </section>
    </div>
  );
}

export default Home