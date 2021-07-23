import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObject }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
	const history = useHistory();

	//로그아웃 구현. 이렇게 쉽다니
	const onLogOutClick = (e) => {
		authService.signOut();
		//리프레쉬 필요
		history.push("/");
	};

	//현재 로그인한 userObject 에서 displayName 변경.
	const onSubmitDisplayName = async (e) => {
		e.preventDefault();
		//현재 이름과 같지 않게 변경 됐을 때
		if (userObject.displayName !== newDisplayName) {
			await userObject.updateProfile({
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};

	useEffect(() => {
		//collection 내부의 어떤 값을 필터링 해서 데이터를 가져오는 함수.
		// query!!
		const getMyNweets = async () => {
			const nweets = await dbService
				.collection("nweets")
				//필터링 조건
				.where("creatorId", "==", userObject.uid)
				//정렬순서 - 색인이 생성되지 않았으면 최초 색인 생성을 해야함. 오류 메시지에서 친절히 안내해준다.
				.orderBy("createdAt")
				.get();
			console.log(nweets.docs.map((doc) => doc.data()));
		};
		getMyNweets();
	}, [userObject.uid]);

	return (
		<div>
			<form onSubmit={onSubmitDisplayName}>
				<input
					type="text"
					value={newDisplayName}
					placeholder="Display Name"
					onChange={(e) => setNewDisplayName(e.target.value)}
				/>
				<input type="submit" value="Update Display Name" />
			</form>
			<button onClick={onLogOutClick}>Log out</button>
		</div>
	);
};

export default Profile;
