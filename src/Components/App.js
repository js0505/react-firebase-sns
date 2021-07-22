import React, { useEffect, useState } from "react";
import ScreenRouter from "Components/ScreenRouter";
import { authService } from "../fbase";

const App = () => {
	//like Loading...
	const [init, setInit] = useState(false);
	//firebase의 로그인 상태를 state 기본값으로 가진다.
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//로그인 시에 로그인한 유저의 정보저장.
	const [userObject, setUserObject] = useState(null);

	useEffect(() => {
		//로그인 상태의 변화를 체크하는 '이벤트리스너'
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				//로그인한 유저정보 저장.
				setUserObject(user);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<div>
			{init ? <ScreenRouter userObject={userObject} isLoggedIn={isLoggedIn} /> : "Initializing..."}
		</div>
	);
};

export default App;
