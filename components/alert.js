export default function Alert({ preview }) {
  return (
    <aside className="alert">
      {preview ? (
        <>
          This is page is a preview.&nbsp;
          <a
            href="/api/exit-preview"
            className="underline hover:text-cyan duration-200 transition-colors"
          >
            Click here
          </a>
          &nbsp;to exit preview mode.
        </>
      ) : null}
    </aside>
  );
}
