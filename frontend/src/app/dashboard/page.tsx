import { redirect } from "next/navigation";
import { changeName, changeRole } from "@/actions/profile";
import { delay } from "@/lib/delay";
import { getSession } from "@/lib/getSessions";

const ProfilePage = async () => {
  await delay(1000);

  const session = await getSession();
  console.log(session);
  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="profile">
      <h1>Welcome to the ProfilePage</h1>
      <p>
        Welcome, <b>{session.name}</b>
      </p>
      <span>
        You are a <b>{session.role === "admin" ? "admin" : "user"}</b>
      </span>
      <form action={changeRole}>
        <button>
          {session.role === "admin" ? "become Admin" : "become User"}
        </button>
      </form>

      <form action={changeName}>
        <input type="text" name="name" required placeholder={session.name} />
        <button>Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;
