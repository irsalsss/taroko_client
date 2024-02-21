
import { render } from '@/utils/test'
import Modal from './modal';

describe("Button", () => {
  it("should render button successfully", () => {
    const { baseElement } = render(<Modal />)

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
