import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {
  
  useEffect(() => { // useEffect: 페이지에 들어오자마자 실행한다
    axios.get('/api/hello')
    .then(response => console.log(response))
  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        console.log(response.data)
        if(response.data.success){
          document.location.href="/login"
        }else{
          alert("로그아웃 실패!")
        }
      })
  }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage
