import { ImageResponse } from "next/og";

// Prerender at build time for `output: export` (GitHub Pages has no server).
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#0a0a0a",
				}}
			>
				<svg
					viewBox="0 0 24 24"
					width="26"
					height="26"
				>
					<path
						d="M 3 22 V 7 Q 3 4 6 4 H 9 Q 11 4 11 7 V 22 H 9 V 7 Q 9 6 8 6 H 6 Q 5 6 5 7 V 22 Z"
						fill="#E0234E"
					/>
					<path
						d="M 12 22 V 3 H 17 Q 22 3 22 8 V 15 Q 22 20 17 20 H 14 V 22 Z M 14 6 V 18 H 17 Q 20 18 20 15 V 8 Q 20 6 18 6 Z"
						fill="#C5F74F"
						fillRule="evenodd"
					/>
				</svg>
			</div>
		),
		{ ...size },
	);
}