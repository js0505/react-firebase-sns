import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
	return (
		<ul>
			<h1>Navigation</h1>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/profile">My Profile</Link>
			</li>
		</ul>
	);
};

export default Navigation;
