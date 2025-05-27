"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

function NoData() {
	return (
		<div className="min-h-screen bg-neutral-50 flex items-center justify-center">
			<div className="text-center px-4">
				<div className="text-6xl mb-6">😢</div>
				<h1 className="text-3xl font-bold text-red-500 mb-4">
					Không tìm thấy chương trình
				</h1>
				<p className="text-lg text-neutral-600 mb-8">
					Chương trình bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
				</p>
				<Button variant="primary">
					<Link href="/programs" className="flex items-center">
						<FaArrowLeft className="mr-2" />
						<span>Quay lại dự án</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default NoData;
