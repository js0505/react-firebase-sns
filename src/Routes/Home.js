import Nweet from "Components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//App.js에서 로그인 할 때 받은 useObject state
const Home = ({ userObject }) => {
	//form을 통해 새로 만드는 nweet의 state
	const [nweet, setNweet] = useState("");
	//firestore에서 nweet을 받아오는 state
	const [nweets, setNweets] = useState([]);
	//업로드한 사진파일의 url정보
	const [attachment, setAttachment] = useState();

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

	const onFileChange = (e) => {
		const {
			target: { files },
		} = e;
		//이벤트에 입력된 파일정보를 theFile에 담고
		const theFile = files[0];
		//FileReader API 불러오기
		const reader = new FileReader();
		// API의 파일로드가 끝나면 발생하는 이벤트
		reader.onloadend = (finishedEvent) => {
			//로드가 끝난 데이터 내부에 저장된 Url데이터를 state에 저장
			const {
				currentTarget: { result },
			} = finishedEvent;
			setAttachment(result);
		};
		//로드가 된 파일을 url로 읽음
		reader.readAsDataURL(theFile);
	};

	const onClearAttachment = () => setAttachment(null);
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
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" name="Nweet" />
				{attachment && (
					<div>
						<img src={attachment} width="50px" />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
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
