import { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Risidencies";
function Home() {
  useEffect(() => {
    document.body.className = "int_white_bg hd-white";

    // Cleanup on unmount
    return () => {
      document.body.className = "";
    };
  }, []);
  return (
    <div className="App">
      <div>
        <div className="white-gradient">
          <Hero />
          <Residencies />
        </div>
      </div>
    </div>
  );
}

export default Home;
