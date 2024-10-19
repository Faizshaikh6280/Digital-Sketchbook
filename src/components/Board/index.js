import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Board() {
  const activeMenuItem = useSelector((store) => store.menu.activeMenuItem);

  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const { color, size } = useSelector((store) => store.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const changeConfig = () => {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    };

    changeConfig();
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function handleMousDown(e) {
      shouldDraw.current = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    }

    function handleMouseMove(e) {
      if (!shouldDraw.current) return;
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }

    function handleMouseUp(e) {
      shouldDraw.current = false;
    }

    canvas.addEventListener("mousedown", handleMousDown);

    canvas.addEventListener("mousemove", handleMouseMove);

    canvas.addEventListener("mouseup", handleMouseUp);

    // when mounting

    return () => {
      canvas.removeEventListener("mousedown", handleMousDown);

      canvas.removeEventListener("mousemove", handleMouseMove);

      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

export default Board;
