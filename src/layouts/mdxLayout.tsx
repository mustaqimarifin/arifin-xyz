import "$$/mdx.css"; //./src/styles/mdx.css'
export default function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto md:max-w-screen-md  lg:max-w-screen-lg">
      <div className="mdx">{children}</div>
    </div>
  );
}
