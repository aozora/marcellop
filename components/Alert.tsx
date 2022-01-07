import Link from 'next/link';
import styles from './Alert.module.scss';

export type AlertProps = {
  preview?: boolean;
};

/**
 * When th epage is viewed in preview mode, display a snackbar floating in the top center of the browser
 * with a link to exit the preview mode.
 *
 * This component is visible only when preview is true.
 *
 * @param preview
 * @constructor
 */
export const Alert = ({ preview = false }: AlertProps): JSX.Element => {
  if (!preview) {
    return null;
  }

  return (
    <aside className={styles.Alert}>
      {preview ? (
        <>
          This is page is a preview.&nbsp;
          <Link href="/api/exit-preview">
            <a>Click here</a>
          </Link>
          &nbsp;to exit preview mode.
        </>
      ) : (
        <>
          This is page is showing published content.&nbsp;
          <Link href="/api/preview">
            <a>Click here</a>
          </Link>
          &nbsp;to enter preview mode!
        </>
      )}
    </aside>
  );
};
