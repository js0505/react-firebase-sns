import React, { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
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
				<input type="submit" value="Login" />
			</form>
			<div>
				<button>Continue With Google</button>
				<button>Continue With Github</button>
			</div>
		</div>
	);
};

export default Auth;
