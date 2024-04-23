import { getSession } from "@/lib/getSessions";
import { redirect } from "next/navigation";

export default async function TransactionLayout({
  children,
 
}: Readonly<{
  children: React.ReactNode;

}>) {

    const session = await getSession();

    // only super admin allowed : has role id 1
    if (session.role === 2){
      redirect('/dashboard')
    }
      return (
          <div className="w-full"> {children}</div>
      );
}
