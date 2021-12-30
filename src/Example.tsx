import "./Example.css";

import { useMemo, useRef } from "react";
import { Point } from "./models";
import { useDraggable } from "./useDraggable";
import { getAngle, getPointWithDistanceAndAngle } from "./utils";
import { useDistance } from "./useDistance";

interface ExampleProps {
  initialPositionA?: Point;
  initialPositionB?: Point;
}

export function Example({ initialPositionA, initialPositionB }: ExampleProps) {
  const refA = useRef<HTMLDivElement>(null);
  const {
    position: positionA,
    setPosition: setPositionA,
    ...restA
  } = useDraggable(refA, initialPositionA ?? { x: 200, y: 200 });

  const refB = useRef<HTMLDivElement>(null);
  const {
    position: positionB,
    setPosition: setPositionB,
    ...restB
  } = useDraggable(refB, initialPositionB ?? { x: 600, y: 300 });

  const [distance, setDistance] = useDistance(positionA, positionB);

  const angleAB = useMemo(
    () => getAngle(positionA, positionB),
    [positionA.x, positionA.y, positionB.x, positionB.y]
  );

  return (
    <div>
      <div className="circle" data-testid="circle1" ref={refA} {...restA}>
        <label>
          X1{" "}
          <input
            type="number"
            name="x1"
            data-testid="x1"
            value={positionA.x}
            onChange={(e) => {
              const x = Number(e.currentTarget.value);
              setPositionA({ x, y: positionA.y });
            }}
          />
        </label>

        <label>
          Y1{" "}
          <input
            type="number"
            name="y1"
            data-testid="y1"
            value={positionA.y}
            onChange={(e) => {
              const y = Number(e.currentTarget.value);
              setPositionA({ y, x: positionA.x });
            }}
          />
        </label>
      </div>

      <div className="circle" data-testid="circle2" ref={refB} {...restB}>
        <label>
          X2{" "}
          <input
            type="number"
            name="x2"
            data-testid="x2"
            value={positionB.x}
            onChange={(e) => {
              const x = Number(e.currentTarget.value);
              setPositionB({ x, y: positionB.y });
            }}
          />
        </label>

        <label>
          Y2{" "}
          <input
            type="number"
            name="y2"
            data-testid="y2"
            value={positionB.y}
            onChange={(e) => {
              const y = Number(e.currentTarget.value);
              setPositionB({ y, x: positionB.x });
            }}
          />
        </label>
      </div>

      <div
        className="distance-line"
        style={{
          width: distance,
          left: positionA.x,
          top: positionA.y,
          transform: `rotate(${angleAB}deg)`,
        }}
      >
        <input
          type="number"
          value={distance}
          data-testid="distance"
          onChange={(e) => {
            const d = Number(e.currentTarget.value);
            setDistance(d);
            const newBPosition = getPointWithDistanceAndAngle({
              point: positionA,
              distance,
              angle: angleAB,
            });
            setPositionB(newBPosition);
          }}
        />
      </div>
    </div>
  );
}
