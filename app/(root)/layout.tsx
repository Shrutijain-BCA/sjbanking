import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/user.model";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) {
      redirect("/sign-in");
    }
    await connectDB();
    const loggedIN = JSON.parse(
  JSON.stringify(await User.findById(userId))
);
  return (
    <section className="flex h-screen w-full font-inter">
        <SideBar user={loggedIN}/>
        <div className="flex size-full flex flex-col">
          <div className="root-layout">
            <Image
              src="/icons/logo.svg"
              alt="SJ Banking Logo"
              width={30}
              height={30}
            />
            <div>
              <MobileNav user={loggedIN}/>
            </div>
          </div>
        {children}
        </div>
    </section>
  );
}
