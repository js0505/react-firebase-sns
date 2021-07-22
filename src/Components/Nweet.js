import React from "react";

const Nweet = ({ nweetObject, isOwner }) => {
	//nweet 데이터의 id와 현재 접속자 id가 일치하면 수정, 삭제버튼 등장.
	return (
		<div>
			<h4>{nweetObject.text}</h4>
			{isOwner && (
				<>
					<button>Delete</button>
					<button>Update</button>
				</>
			)}
		</div>
	);
};

export default Nweet;
