export default function Alert({ preview }) {
  return (
    <div>
      {preview ? (
        <>
          This is page is a preview.
          {' '}
          <a
            href="/api/exit-preview"
            className="underline hover:text-cyan duration-200 transition-colors"
          >
            Click here
          </a>
          {' '}
          to exit preview mode.
        </>
      ) : null}
    </div>
  );
}
