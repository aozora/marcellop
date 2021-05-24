import { motion } from 'framer-motion';
import styles from './AppLoader.module.scss';

const loaderDelay = 2;

const topHalfBoxVariants = {
  initial: {
    top: 0
  },
  animate: {
    top: '-100%',
    transition: {
      delay: loaderDelay,
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
    bottom: 0
  },
  animate: {
    bottom: '-100%',
    transition: {
      delay: loaderDelay,
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
        onAnimationStart={() =>
          document.documentElement.classList.add('overflow-hidden')
        }
        onAnimationComplete={() => {
          document.documentElement.classList.remove('overflow-hidden');
        }}
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
