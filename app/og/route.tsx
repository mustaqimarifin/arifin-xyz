//@ts-nocheck
import { ImageResponse } from "next/og";

// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fontData = await fetch(
      new URL("../../public/fonts/PublicSans-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    const imageData = await fetch(
      new URL("../../public/og.png", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "arifin.xyz";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <img width="1200" height="630" src={imageData} />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "black",
              marginTop: 30,
              //padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
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
