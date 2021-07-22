import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
	const [nweet, setNweet] = useState("");

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
		</div>
	);
};

export default Home;
