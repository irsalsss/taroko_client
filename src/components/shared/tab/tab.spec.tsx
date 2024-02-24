import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/test/react-testing-setup";
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

  it("should change tab", async () => {
    const onClick = jest.fn();

    render(<Tab options={tabOptions} onClickTab={onClick} />);

    const favTab = screen.getByText("Favorites");
    userEvent.click(favTab);

    await waitFor(() => {
      expect(favTab.parentElement).toHaveClass("tab-active");
    });
  });
});
