import Button from "./button";
import { render } from '@/utils/test/test'

describe("Button", () => {
  it("should render button successfully", () => {
    const { baseElement } = render(<Button label="Click me" />)

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
