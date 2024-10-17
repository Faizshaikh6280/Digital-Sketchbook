import React, { useRef } from "react";

function Board() {
  const canvasRef = useRef(null);

  return <cnavas ref={canvasRef}>Board</cnavas>;
}

export default Board;
