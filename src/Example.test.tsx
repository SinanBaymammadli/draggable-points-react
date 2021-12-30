import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Example } from "./Example";

describe("Example", () => {
  it("should render correctly with initial state", () => {
    render(
      <Example
        initialPositionA={{ x: 100, y: 100 }}
        initialPositionB={{ x: 600, y: 100 }}
      />
    );

    expect(screen.getByTestId<HTMLInputElement>("x1").value).toEqual("100");
    expect(screen.getByTestId<HTMLInputElement>("y1").value).toEqual("100");
    expect(screen.getByTestId<HTMLInputElement>("x2").value).toEqual("600");
    expect(screen.getByTestId<HTMLInputElement>("y2").value).toEqual("100");
  });

  it("should change point position with mouse", () => {
    render(<Example />);

    const circle1 = screen.getByTestId("circle1");

    fireEvent.mouseDown(circle1);
    fireEvent.mouseMove(circle1, { clientX: 200, clientY: 250 });
    fireEvent.mouseUp(circle1);

    expect(screen.getByTestId<HTMLInputElement>("x1").value).toEqual("200");
    expect(screen.getByTestId<HTMLInputElement>("y1").value).toEqual("250");
  });

  it("should not change point position after mouseUp event", () => {
    render(<Example />);

    const circle1 = screen.getByTestId("circle1");

    fireEvent.mouseDown(circle1);
    fireEvent.mouseMove(circle1, { clientX: 200, clientY: 250 });
    fireEvent.mouseUp(circle1);
    fireEvent.mouseMove(circle1, { clientX: 250, clientY: 350 });

    expect(screen.getByTestId<HTMLInputElement>("x1").value).toEqual("200");
    expect(screen.getByTestId<HTMLInputElement>("y1").value).toEqual("250");
  });

  it("should show correct dictance between elements", () => {
    render(<Example />);

    const circle1 = screen.getByTestId("circle1");
    const circle2 = screen.getByTestId("circle2");

    fireEvent.mouseDown(circle1);
    fireEvent.mouseMove(circle1, { clientX: 200, clientY: 250 });
    fireEvent.mouseUp(circle1);

    fireEvent.mouseDown(circle2);
    fireEvent.mouseMove(circle2, { clientX: 500, clientY: 600 });
    fireEvent.mouseUp(circle2);

    expect(screen.getByTestId<HTMLInputElement>("distance").value).toEqual(
      "461"
    );
  });

  it("should change element position with input controls", () => {
    render(<Example />);

    const circle1XInput = screen.getByLabelText("X1");
    const circle1YInput = screen.getByLabelText("Y1");
    const circle2XInput = screen.getByLabelText("X2");
    const circle2YInput = screen.getByLabelText("Y2");

    fireEvent.change(circle1XInput, { target: { value: "200" } });
    fireEvent.change(circle1YInput, { target: { value: "300" } });
    fireEvent.change(circle2XInput, { target: { value: "400" } });
    fireEvent.change(circle2YInput, { target: { value: "600" } });

    expect(screen.getByTestId<HTMLInputElement>("distance").value).toEqual(
      "361"
    );
  });

  // it("should change second element position with distance input controls", () => {
  //   render(
  //     <Example
  //       initialPositionA={{ x: 200, y: 300 }}
  //       initialPositionB={{ x: 400, y: 600 }}
  //     />
  //   );

  //   const distanceInput = screen.getByTestId("distance");

  //   fireEvent.change(distanceInput, { target: { value: "500" } });

  //   const circle2XInput = screen.getByLabelText<HTMLInputElement>("X2");
  //   const circle2YInput = screen.getByLabelText<HTMLInputElement>("Y2");

  //   expect(circle2XInput.value).toEqual("500");
  //   expect(circle2YInput.value).toEqual("700");
  // });
});
