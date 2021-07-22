import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObject, isOwner }) => {
	//수정 하고있는지 아닌지 확인
	const [editing, setEditing] = useState(false);
	//업데이트 될 새로운 nweet
	const [newNweet, setNewNweet] = useState(nweetObject.text);

	//삭제버튼 클릭
	const onDeleteClick = async (e) => {
		const ok = window.confirm("Are you sure you want to delete this nweet?");
		if (ok) {
			// delete nweet
			// doc함수로 collection 내부의 id로 값을 찾아 삭제.
			await dbService.doc(`nweets/${nweetObject.id}`).delete();
		}
	};

	//업데이트 버튼 클릭
	const onSubmit = async (e) => {
		e.preventDefault();
		//document의 업데이트 할 값을 함수에 입력
		await dbService.doc(`nweets/${nweetObject.id}`).update({
			text: newNweet,
		});
		setEditing(false);
	};

	// update, cancel 버튼 토글
	const toggleEditing = () => setEditing((prev) => !prev);

	//nweet 데이터의 id와 현재 접속자 id가 일치하면 수정, 삭제버튼 등장.
	return (
		<div>
			{/* update버튼 클릭하고, 사용자가 생성한 글이 맞는지 확인 */}
			{editing ? (
				isOwner && (
					<>
						<form onSubmit={onSubmit}>
							<input
								type="text"
								placeholder="Edit your Nweet"
								value={newNweet}
								onChange={(e) => setNewNweet(e.target.value)}
								required
							/>
							<input type="submit" value="Update" />
						</form>
						<button onClick={toggleEditing}>cancel</button>
					</>
				)
			) : (
				<>
					<h4>{nweetObject.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete</button>
							<button onClick={toggleEditing}>Update</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
