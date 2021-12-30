import { Point } from "./models";

export function getDistance(a: Point, b: Point): number {
  return Math.round(Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)));
}

export function getPointWithDistanceAndAngle({
  point,
  distance,
  angle,
}: {
  point: Point;
  distance: number;
  angle: number;
}): Point {
  return {
    x: point.x + distance * Math.cos((angle * Math.PI) / 180),
    y: point.y + distance * Math.sin((angle * Math.PI) / 180),
  };
}

export function getAngle(a: Point, b: Point): number {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}
