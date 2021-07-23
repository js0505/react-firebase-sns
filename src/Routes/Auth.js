import AuthForm from "Components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";

const Auth = () => {
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
			<AuthForm />
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
