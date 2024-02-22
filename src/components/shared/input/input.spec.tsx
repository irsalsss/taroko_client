
import { render } from '@/utils/test/test'
import Input from './input';

describe("Input", () => {
  it("should render input successfully", () => {
    const { baseElement } = render(<Input placeholder="Search ..." />)

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
