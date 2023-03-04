export type HeroProps = {
  heading1: string;
  heading1Ja: string;
  heading2: string;
  heading2Ja: string;
};

export const Hero = ({
  heading1,
  heading2Ja,
  heading2,
  heading1Ja,
}: HeroProps): JSX.Element => {
  return (
    <section className="hero">
      <h1 className="splitting">
        <span className="visuallyhidden">{heading1}</span>
        {heading1.split(" ").map((word, wordIndex) => (
          <div key={wordIndex} className="word">
            {Array.from(word).map((char, charIndex) => (
              <span key={charIndex} aria-hidden="true" className="char">
                {char}
              </span>
            ))}
            <div className="title-hover">
              <span lang="ja">{heading1Ja[wordIndex]}</span>
            </div>
            &nbsp;
          </div>
        ))}
      </h1>

      <h2>
        <span className="visuallyhidden">{heading1}</span>
        {heading2.split(" ").map((word, wordIndex) => (
          <div key={wordIndex} className="word">
            {Array.from(word).map((char, charIndex) => (
              <span key={charIndex} aria-hidden="true" className="char">
                {char}
              </span>
            ))}
            <div className="title-hover">
              <span lang="ja">{heading2Ja}</span>
            </div>
            &nbsp;
          </div>
        ))}
      </h2>
    </section>
  );
};
