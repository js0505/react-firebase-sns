import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";

const NweetFactory = ({ userObject }) => {
	//form을 통해 새로 만드는 nweet의 state
	const [nweet, setNweet] = useState("");
	//업로드한 사진파일의 url정보
	const [attachment, setAttachment] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		let attachmentUrl = "";

		//업로드한 파일이 있을 경우 실행
		if (attachment !== "") {
			//user의 id로 폴더를 만들어 각 사용자별로 공간을 분리하고
			//이름을 uuid를 사용해서 랜덤하게 만들어 저장.
			const attachmentRef = storageService
				.ref()
				.child(`${userObject.uid}/${uuidv4()}`);
			//인코딩 할 data url, 인코딩 형식을 전송.
			const response = await attachmentRef.putString(attachment, "data_url");
			//업로드 된 파일의 url 정보 받아옴.
			attachmentUrl = await response.ref.getDownloadURL();
		}

		//저장되는 document의 형식
		const nweetObject = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObject.uid,
			attachmentUrl,
		};

		//firestore에 nweets collection('nweets')에 document 추가
		// id값은 자동 추가.
		await dbService.collection("nweets").add(nweetObject);
		// form 초기화
		setNweet("");
		setAttachment("");
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

	//사진 업로드 중에 clear버튼 클릭 시.
	const onClearAttachment = () => setAttachment(null);

	return (
		<>
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
						<img alt="" src={attachment} width="50px" />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
			</form>
		</>
	);
};

export default NweetFactory;
