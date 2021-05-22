import { Transition, TransitionGroup } from 'react-transition-group';
import gsap from 'gsap';
import { useMemo } from 'react';

const PageTransition = ({ path, children }) => {
  /**
   * Transition duration in milliseconds
   * This value must be shared between gsap tween and <Transition>
   * @type {number}
   */
  const duration = 300;

  const onEnter = useMemo(node => {
    gsap.killTweensOf(node);
    gsap.set(node, { clearProps: 'all' });
    gsap.to(node, {
      duration: duration / 1000,
      autoAlpha: 1
      // onComplete() {
      //   node.classList.remove('absolute');
      // }
    });
  }, []);

  const onExit = useMemo(node => {
    gsap.to(node, {
      duration: duration / 1000,
      autoAlpha: 0
    });
  }, []);

  return (
    <div className="layout-content">
      <TransitionGroup>
        <Transition
          onEnter={onEnter}
          onExit={onExit}
          key={path}
          appear
          timeout={duration}
        >
          {/* <div className="container"> */}
          {/*  <div className="content"> */}
          {children}
          {/*  </div> */}
          {/* </div> */}
        </Transition>
      </TransitionGroup>
    </div>
  );
};

export default PageTransition;
