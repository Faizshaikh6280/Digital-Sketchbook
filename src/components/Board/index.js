import { MENU_ITEMS } from "@/constant";
import { actionItemClick } from "@/slice/menuSlice";
import { socket } from "@/socket";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Board() {
  const { activeMenuItem, actionMenuItem } = useSelector((store) => store.menu);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const { color, size } = useSelector((store) => store.toolbox[activeMenuItem]);

  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function beginPath(x, y) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    function handleMousDown(e) {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    }

    function drawing(x, y) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    socket.on("beginPath", (args) => {
      beginPath(args.x, args.y);
    });

    socket.on("drawing", (args) => {
      drawing(args.x, args.y);
    });

    function handleMouseMove(e) {
      if (!shouldDraw.current) return;
      drawing(e.clientX, e.clientY);
      socket.emit("drawing", { x: e.clientX, y: e.clientY });
    }

    function handleMouseUp(e) {
      shouldDraw.current = false;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
      console.log(historyPointer.current);
    }

    canvas.addEventListener("mousedown", handleMousDown);

    canvas.addEventListener("mousemove", handleMouseMove);

    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMousDown);

      canvas.removeEventListener("mousemove", handleMouseMove);

      canvas.removeEventListener("mouseup", handleMouseUp);
      socket.off("beginPath", handleMousDown);
      socket.off("drawing", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const changeConfig = (color, size) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    };

    function handlerChangeConfig(args) {
      changeConfig(args.color, args.size);
    }

    socket.on("changeConfig", handlerChangeConfig);

    changeConfig(color, size);

    return () => {
      socket.off("changeConfig", handlerChangeConfig);
    };
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const dataUrl = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = "capture.jpg";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      let indx = historyPointer.current;
      if (indx > 0) {
        indx--;
        ctx.putImageData(drawHistory.current[indx], 0, 0);
        console.log(indx);
        historyPointer.current = indx;
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      let indx = historyPointer.current;
      if (indx < drawHistory.current.length - 1) {
        indx++;
        console.log(indx);

        ctx.putImageData(drawHistory.current[indx], 0, 0);
        historyPointer.current = indx;
      }
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  return <canvas ref={canvasRef}></canvas>;
}

export default Board;
