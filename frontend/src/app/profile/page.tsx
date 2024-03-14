import { changeRole, changeName, getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();
console.log(session)
  if(!session.isLoggedIn){
    redirect("/")
  }

  return (
    <div className="profile">
      <h1>Welcome to the ProfilePage</h1>
      <p>
        Welcome, <b>{session.name}</b>
      </p>
      <span>You are a <b>{session.role === 'admin' ? "Premium" : "Free"}</b> user</span>
      <form action={changeRole}>
        <button>{session.role === 'admin' ? "Cancel" : "Buy"} Premium</button>
      </form>

      <form action={changeName}>
        <input type="text" name="name" required placeholder={session.name} />
        <button>Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;