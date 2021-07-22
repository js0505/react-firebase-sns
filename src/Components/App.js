import React, { useState } from 'react';
import ScreenRouter from 'Components/ScreenRouter';
import {authService} from '../fbase';

const App = () => {


  //firebase의 로그인 상태를 state 기본값으로 가진다.
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <ScreenRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
};

export default App;