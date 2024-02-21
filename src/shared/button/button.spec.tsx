import Button from "./button";
import { render } from '@/utils/test'

describe("Button", () => {
  it("should render primary button successfully", () => {
    const { baseElement } = render(<Button />)

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
