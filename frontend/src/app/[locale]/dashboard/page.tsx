import { redirect } from "next/navigation";
import { changeName, changeRole } from "@/actions/profile";
import { delay } from "@/lib/delay";
import { getSession } from "@/lib/getSessions";
import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";
import CardStatus from "@/components/CardStatus";
import Association from "@/components/ui/AssociationCard";
import { CardStatusSkeleton } from "@/components/skeletons/CardStatusSkeleton";

const ProfilePage = async () => {
  // await delay(1000);

  const session = await getSession();
  // console.log(session);
  // if (!session.isLoggedIn) {
  //   redirect("/");
  // }

  return (
    <>
    
    <main className="h-full w-full ">

      <CardStatus />
   
    </main>
    </>
  );
};

export default ProfilePage;
