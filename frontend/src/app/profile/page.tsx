
import { getSession } from "@/lib/getSessions";
import { redirect } from "next/navigation";


const ProfilePage = async () => {
  const session = await getSession();
  console.log(session);

  return (
    <div className="profile">
      <h1>Welcome to the ProfilePage</h1>
     
    </div>
  );
};

export default ProfilePage;
