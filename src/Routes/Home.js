import Nweet from "Components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//App.js에서 로그인 할 때 받은 useObject state
const Home = ({ userObject }) => {
	const [nweet, setNweet] = useState("");
	//배열로 새로운값, 이전값을 담기 위해서 기본값은 배열
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		//이전 방법보다 re-render되지 않아서 더 깔끔하고 빠르다.
		//onSnapshot = 이벤트 리스너. collection에 변화가 생기면 데이터를 받아온다.
		dbService.collection("nweets").onSnapshot((snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArray);
		});
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		//firestore에 nweets collection('nweets')에 document 추가
		// id값은 자동 추가.
		await dbService.collection("nweets").add({
			//저장되는 document의 형식
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObject.uid,
		});
		// form 초기화
		setNweet("");
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={nweet}
					placeholder="What's on your mind"
					maxLength={120}
					onChange={(e) => setNweet(e.target.value)}
				/>
				<input type="submit" name="Nweet" />
			</form>
			{nweets.map((nweet) => (
				<Nweet
					key={nweet.id}
					nweetObject={nweet}
					isOwner={nweet.creatorId === userObject.uid}
				/>
			))}
		</div>
	);
};

export default Home;
