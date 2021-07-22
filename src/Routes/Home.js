import React, { useState } from "react";

const Home = () => {
	const [nweet, setNweet] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
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
