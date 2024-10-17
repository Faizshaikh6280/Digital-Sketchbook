import Board from "@/components/Board";
import { Menu } from "@/components/Menu";
import Toolbox from "@/components/Toolbox";
import React from "react";

function Home() {
  return (
    <div>
      <Menu />
      <Toolbox />
      <Board />
    </div>
  );
}

export default Home;
