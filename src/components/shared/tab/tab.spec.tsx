import { render } from "@/utils/test/react-testing-setup";
import Tab from "./tab";

const tabOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Favorites",
    value: "favorites",
  },
];

describe("Tab", () => {
  it("should render tab successfully", () => {
    const { baseElement } = render(<Tab options={tabOptions} />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
