import { Link } from "@remix-run/react";
import Helmet from "react-helmet";

export default function Index() {
  // temp
  const loaded = true;

  return (
    <div>
      <Helmet>
        <body className={loaded ? "home loaded" : "home"} />
      </Helmet>

      <h1>Yo!</h1>
      {/*{heroData && <Hero hero={heroData} />}*/}
      {/*{aboutData && <About about={aboutData} />}*/}
      {/*{whatido && <What whatido={whatido} />}*/}
    </div>
  );
}
