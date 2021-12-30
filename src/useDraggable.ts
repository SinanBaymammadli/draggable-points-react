import React, { useEffect, useState } from "react";
import { Point } from "./models";

interface UseDraggableReturnType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  position: Point;
  setPosition: (point: Point) => void;
}

export function useDraggable(
  ref: React.RefObject<HTMLDivElement>,
  initialPosition: Point = { x: 0, y: 0 }
): UseDraggableReturnType {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState<Point>(initialPosition);
  const [grabDistance, setGrabDistance] = useState<Point>({ x: 0, y: 0 });
  const elementPositions = ref.current?.getBoundingClientRect();
  const elementHalfWidth = (elementPositions?.width ?? 0) / 2;

  useEffect(() => {
    function moveElement(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;

      if (isDragging) {
        setPosition({
          x: x - grabDistance.x,
          y: y - grabDistance.y,
        });
      }
    }

    document.addEventListener("mousemove", moveElement);

    return () => {
      document.removeEventListener("mousemove", moveElement);
    };
  }, [isDragging, grabDistance]);

  return {
    position,
    setPosition,
    style: {
      top: position.y - elementHalfWidth,
      left: position.x - elementHalfWidth,
      cursor: isDragging ? "grabbing" : "grab",
      position: "absolute",
      userSelect: "none",
    },
    onMouseDown: (e) => {
      const elPos = e.currentTarget.getBoundingClientRect();
      const elementCenterX = elPos.x + elementHalfWidth;
      const elementCenterY = elPos.y + elementHalfWidth;

      const mouseXFromPageTopLeft = e.clientX;
      const mouseYFromPageTopLeft = e.clientY;

      setGrabDistance({
        x: mouseXFromPageTopLeft - elementCenterX,
        y: mouseYFromPageTopLeft - elementCenterY,
      });
      setDragging(true);
    },
    onMouseUp: () => {
      setDragging(false);
    },
  };
}
