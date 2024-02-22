import { render } from '@/utils/test/react-testing-setup'
import ContactCard from './contact-card';

describe("ContactCard", () => {
  it("should render contact card successfully", () => {
    const { baseElement } = render(
      <ContactCard
        isFavorite={false}
        onDeleteContact={jest.fn}
        onEditContact={jest.fn}
        onFavoriteContact={jest.fn}
        contact={{
          id: 1,
          firstName: 'James',
          lastName: 'Bond',
          job: 'Software Engineer',
          description: 'Cool guy from Land of Dawn'
        }}
      />
    )

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
