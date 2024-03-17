import { getSession } from "@/lib/getSessions";



const ProfilePage = async () => {
  const session = await getSession();
  console.log(session);

  return (
    <div className="profile">
      <h1>Welcome to the ProfilePage - {session?.name && session.name}</h1>
    </div>
  );
};

export default ProfilePage;
