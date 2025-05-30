"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Nodata() {
	return (
		<div className="pt-24 min-h-screen bg-neutral-50">
			<div className="container-custom py-16 text-center">
				<h1 className="text-3xl font-bold mb-4">Không tìm thấy bài viết</h1>
				<p className="mb-8">Bài viết này không tồn tại hoặc đã bị xóa.</p>
				<Button variant="primary">
					<Link href="/news" className="flex items-center">
						<FaArrowLeft className="mr-2" />
						<span>Quay lại tin tức</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
