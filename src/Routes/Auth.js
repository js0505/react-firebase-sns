import { authService } from "fbase";
import React, { useState } from "react";

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
				<button>Continue With Google</button>
				<button>Continue With Github</button>
			</div>
		</div>
	);
};

export default Auth;
