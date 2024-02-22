import { redirect } from "next/navigation";

const Home = () => {
  redirect("/contacts");

  return (
    <main>
      <div>Home Page</div>
    </main>
  );
};

export default Home;
