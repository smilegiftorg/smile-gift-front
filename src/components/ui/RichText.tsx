import { getStrapiMedia } from "@/utils/helpers";
import ReactMarkdown from "react-markdown";

const RichText = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			children={content}
			// linkTarget="_blank"
			components={{
				img: ({ node, ...props }) => (
					<img src={getStrapiMedia(props.src || "")} />
				),
			}}
		/>
	);
};

export default RichText;
