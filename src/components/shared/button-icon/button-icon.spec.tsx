import { render } from '@/utils/test/test'
import ButtonIcon from './button-icon';
import { StarIcon } from '@radix-ui/react-icons';

describe("ButtonIcon", () => {
  it("should render button icon successfully", () => {
    const { baseElement } = render(
      <ButtonIcon onClick={jest.fn()} label="star-icon">
        <StarIcon color='black' />
      </ButtonIcon>
    )

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
