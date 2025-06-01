import { IBankTransferSection } from "@/types/IPageData";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

function BankTransfer(props: IBankTransferSection) {
	const { bankName, accountHolder, accountNumber } = props || {};
	return (
		<section className="py-16 bg-neutral-50">
			<div className="container-custom">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4">Phương thức quyên góp</h2>
					<p className="text-lg text-neutral-600 max-w-2xl mx-auto">
						Mọi đóng góp đều được ghi nhận và sử dụng minh bạch.
					</p>
				</div>

				<div className="max-w-2xl mx-auto">
					<div className="bg-white p-8 rounded-lg shadow-md">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 flex items-center justify-center bg-primary-100 text-primary-700 rounded-full mr-4">
								<FaMoneyBillWave size={24} />
							</div>
							<h3 className="text-2xl font-bold">Chuyển khoản ngân hàng</h3>
						</div>

						<div className="mb-8">
							<div className="grid grid-cols-3 gap-4 mb-4">
								<div className="col-span-1 text-neutral-500">Ngân hàng:</div>
								<div className="col-span-2 font-medium">{bankName}</div>
							</div>
							<div className="grid grid-cols-3 gap-4 mb-4">
								<div className="col-span-1 text-neutral-500">Số tài khoản:</div>
								<div className="col-span-2 font-medium">{accountNumber}</div>
							</div>
							<div className="grid grid-cols-3 gap-4 mb-4">
								<div className="col-span-1 text-neutral-500">
									Chủ tài khoản:
								</div>
								<div className="col-span-2 font-medium">{accountHolder}</div>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div className="col-span-1 text-neutral-500">Nội dung CK:</div>
								<div className="col-span-2 font-medium">
									[Họ tên] ủng hộ [tên dự án nếu có]
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default BankTransfer;
