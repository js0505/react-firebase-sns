import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

	const onSubmit = async (e) => {
		e.preventDefault();
		//firestore에 nweets collection('nweets')에 document 추가
		// id값은 자동 추가.
		await dbService.collection("nweets").add({
			nweet,
			createdAt: Date.now(),
		});
		// form 초기화
		setNweet("");
	};

	//nweets collection에서 데이터 가져오기.
	const getNweets = async () => {
		const dbNweets = await dbService.collection("nweets").get();
		//foreach로 각각 데이터를 nweetObject 변수에 객체로 저장
		dbNweets.forEach((document) => {
			const nweetObject = {
				...document.data(),
				id: document.id,
			};
			//nweets state에 이전 값들과 차례대로 배열에 저장.
			setNweets((prev) => [nweetObject, ...prev]);
		});
	};
	useEffect(() => {
		getNweets();
	}, []);

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
				<h4 key={nweet.id}>{nweet.nweet}</h4>
			))}
		</div>
	);
};

export default Home;
