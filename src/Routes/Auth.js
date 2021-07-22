import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import Profile from "./Profile";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			let data;
			if (newAccount) {
				//새 계정 생성
				data = await authService.createUserWithEmailAndPassword(
					email,
					password
				);
			} else {
				// 로그인
				data = await authService.signInWithEmailAndPassword(email, password);
			}
			console.log(data);
		} catch (e) {
			setError(e.message);
		}
	};

	//toggleAccount 함수는 newAccount state의 값을 반대로 지정한다.
	const toggleAccount = () => setNewAccount((prev) => !prev);

	const onSocialClick = async (e) => {
		const {
			target: { name },
		} = e;

		//공급자 설정
		let provider;
		if (name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === "github") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		//팝업을 이용해서 공급자 계정으로 가입.
		const data = await authService.signInWithPopup(provider);
		console.log(data);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input
					type="submit"
					value={newAccount ? "Create Account" : "Sign In"}
				/>
				{error}
			</form>
			{/* 로그인 할지, 계정을 생성할지 바꾸는 버튼 */}
			<span onClick={toggleAccount}>
				{newAccount ? "Sign In" : "Create Account"}
			</span>
			<div>
				<button onClick={onSocialClick} name="google">
					Continue With Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue With Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
