import { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Risidencies";

function Home() {
  useEffect(() => {
    document.body.classList.add("int_white_bg", "hd-white");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("int_white_bg", "hd-white");
    };
  }, []);
  return (
    <div className="App">
      <div>
        <Hero />
        <Residencies />
      </div>
    </div>
  );
}

export default Home;
