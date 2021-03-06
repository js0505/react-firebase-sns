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
		//로그인이 실행되면 userObject에 필요한 데이터를 저장하고
		// profile에서 로그아웃이 실행되면 이벤트 리스너로 로그아웃 상태가 확인되어서
		// else 의 state 변경으로 재 랜더링 되어 처리됨.
		authService.onAuthStateChanged((user) => {
			if (user) {
				//로그인한 유저정보 저장.
				//필요한 정보만 가져올 수 있도록 가공.
				setUserObject({
					displayName: user.displayName,
					uid: user.uid,
					//그냥 updateProfile 함수를 실행하는 용도?
					updateProfile: (args) => user.updateProfile(args),
				});
			} else {
				//userObject 상태 변경으로 다시 랜더링 실행.
				setUserObject(null);
			}
			setInit(true);
		});
	}, []);

	//새로 업데이트된 user 정보를 userObject로 다시 상태를 변경 시켜서
	// 연결된 모든 userObject를 다시 랜더링 하게 할 함수.
	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObject({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => user.updateProfile(args),
		});
	};

	return (
		<div>
			{init ? (
				<ScreenRouter
					refreshUser={refreshUser}
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
