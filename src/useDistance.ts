import { useEffect, useState } from "react";
import { Point } from "./models";
import { getDistance } from "./utils";

export function useDistance(
  p1: Point,
  p2: Point
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setDistance(getDistance(p1, p2));
  }, [p1.x, p1.y, p2.x, p2.y]);

  return [distance, setDistance];
}
