import { ImageResponse } from "next/og";

export const runtime = "edge";

/* const loadLocalImage = async () => {
  const fontData = await fs.readFile("../../public/fonts/PublicSans-Bold.ttf"); */
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const hasTitle = searchParams.has("title");
		const postTitle = hasTitle ? searchParams.get("title")?.slice(0, 100) : "arifin.xyz";
		// ?title=<title>public/fonts/PublicSans-Bold.ttf
		//const fontData = path.join(process.cwd(), 'public', '/fonts/PublicSans-Bold.ttf')
		//const imgData = path.join(process.cwd(), 'public', '/og.png')

		//const font = await fs.readFile(fontData)
		//const img = await fs.readFile(imgData)

		//console.log(img)

		const font = fetch(new URL("../../public/fonts/PublicSans-Bold.ttf", import.meta.url)).then((res) =>
			res.arrayBuffer(),
		);
		const fontData = await font;

		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					backgroundImage: "url(https://arifin.xyz/og.png)",
				}}
			>
				<div
					style={{
						marginLeft: 190,
						marginRight: 190,
						display: "flex",
						fontSize: 80,
						fontFamily: "Public Sans",
						letterSpacing: "-0.05em",
						fontStyle: "normal",
						color: "black",
						textShadow: "2px 2px 5px white",
						lineHeight: "120px",
						whiteSpace: "pre-wrap",
					}}
				>
					{postTitle}
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Public Sans",
						data: fontData,
						style: "normal",
					},
				],
			},
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
