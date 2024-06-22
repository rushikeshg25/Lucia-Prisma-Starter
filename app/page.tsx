import { validateRequest } from "@/lib/lucia";

const PublicHomePage = async () => {
  const { user } = await validateRequest();
  return <h2>{JSON.stringify(user)}</h2>;
};

export default PublicHomePage;
