import { render, fireEvent, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import CardEdit from "./CardEdit";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("CardEdit", () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders two input fields", () => {
    render(
      <CardEdit firstValue="10" secondValue="20" exchangeRate={2} cardId={1} />
    );
    const input1 = screen.queryByTestId("input-1");
    expect(input1).toBeInTheDocument();
    const input2 = screen.queryByTestId("input-2");
    expect(input2).toBeInTheDocument();
  });

  it("dispatches updateCardValues when first input is changed", () => {
    render(
      <CardEdit firstValue="10" secondValue="20" exchangeRate={2} cardId={1} />
    );
    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "15" } });
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { id: 1, firstValue: 15, secondValue: 30 },
      type: "card/updateCardValues",
    });
  });

  it("dispatches updateCardValues when second input is changed", () => {
    render(
      <CardEdit firstValue="10" secondValue="20" exchangeRate={2} cardId={1} />
    );
    const input = screen.getByDisplayValue("20");
    fireEvent.change(input, { target: { value: "30" } });
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { id: 1, firstValue: 15, secondValue: 30 },
      type: "card/updateCardValues",
    });
  });

  test('should dispatch updateLastUpdateSortedKeys and setSortedKeysArr when input is blurred', () => {
    render(
      <CardEdit firstValue={1} secondValue={1.23} exchangeRate={1.23} cardId={1} />
    );
    const input1 = screen.getByTestId('input-1');
    fireEvent.blur(input1);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
