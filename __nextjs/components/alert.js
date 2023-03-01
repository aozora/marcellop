export default function Alert() {
  return (
    <aside className="alert">
      This is page is a preview.&nbsp;
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/exit-preview" className="underline hover:text-cyan duration-200 transition-colors">
        Click here
      </a>
      &nbsp;to exit preview mode.
    </aside>
  );
}
