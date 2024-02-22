
import { render } from '@/utils/test'
import Tab from './tab';

const tabOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Favorites',
    value: 'favorites'
  },
]

describe("Button", () => {
  it("should render tab successfully", () => {
    const { baseElement } = render(<Tab options={tabOptions} />)

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
