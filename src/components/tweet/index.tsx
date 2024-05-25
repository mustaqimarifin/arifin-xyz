import {
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
  TweetSkeleton,
} from 'react-tweet'
import type { TwitterComponents } from 'react-tweet'
import { type JSX, Suspense } from 'react'
import { VideoPlayer } from '../client'
import { getTweet } from './cache'
import Image from 'next/image'
import './tweet.css'

type VideoProps = {
  src: string
  alt: string
  width?: number
  height?: number
}
type TComponents = {
  VideoPlayer?: ((props: VideoProps) => JSX.Element) | undefined
} & TwitterComponents

export const components: TComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill />,
  VideoPlayer: (props) => <VideoPlayer {...props} />,
}

const TweetContent = async ({ id, onError }: TweetProps) => {
  let error
  //@ts-expect-error balblablbalbalbalbalblablab you wont  stfu
  const tweet = await getTweet(id).catch((err) => {
    if (onError) {
      error = onError(err)
    } else {
      console.error(err)
      error = err
    }
  })

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound error={error} />
  }

  return <EmbeddedTweet tweet={tweet} components={components} />
}

const ReactTweet = (props: TweetProps) => <TweetContent {...props} />

export default function Tweet({ id }: { id: string }) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <Suspense fallback={<TweetSkeleton />}>
          <ReactTweet id={id} />
        </Suspense>
      </div>
    </div>
  )
}

/* const checksum = (content) => {
  return createHash('md5').update(content).digest('hex')
} */
