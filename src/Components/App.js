import React, { useEffect, useState } from "react";
import ScreenRouter from "Components/ScreenRouter";
import { authService } from "../fbase";

const App = () => {
	//like Loading...
	const [init, setInit] = useState(false);
	//로그인 시에 로그인한 유저의 정보저장.
	const [userObject, setUserObject] = useState(null);

	useEffect(() => {
		//로그인 상태의 변화를 체크하는 '이벤트리스너'
		authService.onAuthStateChanged((user) => {
			if (user) {
				//로그인한 유저정보 저장.
				setUserObject(user);
			}
			setInit(true);
		});
	}, []);

	return (
		<div>
			{init ? (
				<ScreenRouter
					userObject={userObject}
					isLoggedIn={Boolean(userObject)}
				/>
			) : (
				"Initializing..."
			)}
		</div>
	);
};

export default App;
