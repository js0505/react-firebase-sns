import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Auth, Profile, EditProfile } from "../Routes";
import Navigation from "./Navigation";

const ScreenRouter = ({ isLoggedIn, userObject }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation />}
			<Switch>
				{/* 같은 path에서 로그인 상태에 따라 보이는 화면을 다르게. */}
				{isLoggedIn ? (
					<>
						<Route path="/">
							<Home userObject={userObject} />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
					</>
				) : (
					<Route path="/">
						<Auth />
					</Route>
				)}
			</Switch>
		</Router>
	);
};

export default ScreenRouter;
