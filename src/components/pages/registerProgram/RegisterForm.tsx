"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegistrationFormData = {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	message: string;
	agreeTerms: boolean;
};

function RegisterForm() {
	const params = useParams();
	const { slug } = params || {};
	const [isSubmitted, setIsSubmitted] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationFormData>();

	const onSubmit = (data: RegistrationFormData) => {
		setIsSubmitted(true);
	};

	return (
		<div className="max-w-2xl mx-auto">
			{!isSubmitted ? (
				<form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
					<div className="mb-6">
						<label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
							Họ và tên <span className="text-accent-500">*</span>
						</label>
						<input
							id="fullName"
							type="text"
							className={`w-full px-4 py-2 border ${
								errors.fullName ? "border-accent-500" : "border-neutral-300"
							} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
							{...register("fullName", { required: true })}
						/>
						{errors.fullName && <span className="text-sm text-accent-500 mt-1">Vui lòng nhập họ tên của bạn</span>}
					</div>

					<div className="mb-6">
						<label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
							Email <span className="text-accent-500">*</span>
						</label>
						<input
							id="email"
							type="email"
							className={`w-full px-4 py-2 border ${
								errors.email ? "border-accent-500" : "border-neutral-300"
							} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
							{...register("email", {
								required: true,
								pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							})}
						/>
						{errors.email && <span className="text-sm text-accent-500 mt-1">Vui lòng nhập email hợp lệ</span>}
					</div>

					<div className="mb-6">
						<label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
							Số điện thoại <span className="text-accent-500">*</span>
						</label>
						<input
							id="phone"
							type="tel"
							className={`w-full px-4 py-2 border ${
								errors.phone ? "border-accent-500" : "border-neutral-300"
							} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
							{...register("phone", { required: true })}
						/>
						{errors.phone && <span className="text-sm text-accent-500 mt-1">Vui lòng nhập số điện thoại</span>}
					</div>

					<div className="mb-6">
						<label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
							Địa chỉ
						</label>
						<input
							id="address"
							type="text"
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
							{...register("address")}
						/>
					</div>

					<div className="mb-6">
						<label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
							Lời nhắn
						</label>
						<textarea
							id="message"
							rows={4}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
							{...register("message")}
						></textarea>
					</div>

					<div className="mb-6">
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input
									id="agreeTerms"
									type="checkbox"
									className={`h-4 w-4 text-primary-600 border ${
										errors.agreeTerms ? "border-accent-500" : "border-neutral-300"
									} rounded focus:ring-primary-500`}
									{...register("agreeTerms", { required: true })}
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="agreeTerms" className="text-neutral-700">
									Tôi đồng ý với{" "}
									<a href="#" className="text-primary-700 hover:underline">
										điều khoản
									</a>{" "}
									và{" "}
									<a href="#" className="text-primary-700 hover:underline">
										chính sách bảo mật
									</a>{" "}
									của CLB <span className="text-accent-500">*</span>
								</label>
								{errors.agreeTerms && (
									<p className="text-accent-500 mt-1">Bạn cần đồng ý với điều khoản và chính sách</p>
								)}
							</div>
						</div>
					</div>

					<Button type="submit" variant="primary" size="lg" fullWidth>
						Đăng ký tham gia
					</Button>
				</form>
			) : (
				<div className="bg-white p-8 rounded-lg shadow-md text-center">
					<div className="text-5xl mb-4">🎉</div>
					<h2 className="text-2xl font-bold mb-4">Đăng ký tham gia thành công!</h2>
					<p className="text-neutral-600 mb-6">
						Cảm ơn bạn đã đăng ký tham gia chương trình. Chúng tôi sẽ liên hệ với bạn qua email hoặc số điện thoại để
						xác nhận thông tin.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button variant="outline">
							<Link href={`/programs/${slug}`}>Quay lại trang chương trình</Link>
						</Button>
						<Button variant="primary">
							<Link href="/programs">Xem các chương trình khác</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default RegisterForm;
