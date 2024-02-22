
import { render } from '@/utils/test'
import Input from './input';

describe("Button", () => {
  it("should render input successfully", () => {
    const { baseElement } = render(<Input placeholder="Search ..." />)

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
