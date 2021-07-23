import React, { useEffect, useState } from "react";
import Nweet from "Components/Nweet";
import { dbService } from "fbase";
import NweetFactory from "Components/NweetFactory";

//App.js에서 로그인 할 때 받은 useObject state
const Home = ({ userObject }) => {
	//firestore에서 현재 존재하는 nweet들을 받아오는 state
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

	return (
		<div>
			<NweetFactory userObject={userObject} />
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
