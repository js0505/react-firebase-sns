import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
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
			console.log(e);
		}
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
				<input type="submit" value={newAccount ? "Create Account" : "Log In"} />
			</form>
			<div>
				<button>Continue With Google</button>
				<button>Continue With Github</button>
			</div>
		</div>
	);
};

export default Auth;
