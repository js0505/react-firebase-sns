import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
	const history = useHistory();
	const onLogOutClick = (e) => {
		authService.signOut();
		history.push("/");
	};

	return (
		<div>
			<button onClick={onLogOutClick}>Log out</button>
		</div>
	);
};

export default Profile;
