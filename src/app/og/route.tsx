import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const hasTitle = searchParams.has('title')
    const postTitle = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'arifin.xyz'
    const font = fetch(
      new URL('public/fonts/PublicSans-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())
    const fontData = await font

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundImage: 'url(https://arifin.xyz/og.png)',
          }}
        >
          <div
            style={{
              marginLeft: 190,
              marginRight: 190,
              display: 'flex',
              fontSize: 80,
              fontFamily: 'Public Sans',
              letterSpacing: '-0.05em',
              fontStyle: 'normal',
              color: 'black',
              textShadow: '2px 2px 5px white',
              lineHeight: '120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {postTitle}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Public Sans',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (error) {
    console.log(`${error}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
