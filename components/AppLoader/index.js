import { motion } from 'framer-motion';
import styles from './AppLoader.module.scss';

const topHalfBoxVariants = {
  initial: {
    // height: '65vh',
    top: 0
  },
  animate: {
    top: '-100%',
    transition: {
      delay: 1,
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1]
    }
  },
  exit: {
    display: 'none'
  }
};

const bottomHalfBoxVariants = {
  initial: {
    // height: '60vh',
    bottom: 0
  },
  animate: {
    bottom: '-100%',
    transition: {
      delay: 1,
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1]
    }
  },
  exit: {
    display: 'none'
  }
};

const AppLoader = () => {
  return (
    <div className={styles.AppLoaderContainer}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={topHalfBoxVariants}
        onAnimationStart={() => document.body.classList.add('overflow-hidden')}
        onAnimationComplete={() =>
          document.body.classList.remove('overflow-hidden')
        }
      />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={bottomHalfBoxVariants}
      />
      <motion.span
        animate={{
          opacity: 0,
          transition: { delay: 2.4 }
        }}
        exit={{ display: 'none' }}
        className={styles.Hi}
      >
        Hi!
      </motion.span>
    </div>
  );
};
export default AppLoader;
