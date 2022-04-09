import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "components";

export default function Login() {
	const remember = false;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const schema = yup
		.object()
		.shape({
			email: yup.string().required("Email is required"),
			password: yup.string().required("Password is required"),
		})
		.required();

	const onSubmit = () => {};

	const renderLogin = () => {
		return (
			<>
				<div className="flex w-screen h-screen justify-center items-center px-4 sm:px-0">
					<div className="w-[35%] h-auto">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col items-center border-base w-full h-auto p-6">
								<div>
									<img src="/images/mtms-logo.png" alt="logo" />
								</div>
								<div className="pt-12 pb-6">
									<p className="text-white text-lg">Login to your Account</p>
								</div>
								<div className="w-full">
									<button className="btn btn-block btn-primary">Connect Wallet</button>
								</div>
								<div className="w-full pt-4">
									<button className="btn btn-base">Connect Avalanche</button>
								</div>
								<div className="w-full pt-6">
									<Input
										register={register("mail")}
										label="Mail"
										placeholder="Enter your mail"
										error={errors.mail}
									/>
								</div>
								<div className="w-full pt-3">
									<Input
										register={register("password")}
										label="Password"
										placeholder="Enter your password"
										error={errors.password}
									/>
								</div>
								<div className="w-full pt-9">
									<button className="btn btn-block btn-primary">Login</button>
								</div>
								<div className="flex flex-row justify-between w-full pt-6">
									<a className="text-[13px] btn-link-dark">Forget Password?</a>
									<a className="text-[13px] btn-link-light">Click to Register</a>
								</div>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	};

	return remember ? <></> : renderLogin();
}
