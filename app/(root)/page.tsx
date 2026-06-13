import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/user.model";
import { redirect  } from "next/navigation";
const Home = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
    if (!userId) {
    redirect("/sign-in");
  }
  await connectDB();
  const loggedIN = await User.findById(userId);

  console.log("loggggggged in inside dashboard: ", loggedIN);

  return (
    <section className='home'>
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome back "
            subtext="Access and Manage your Account Here!"
            user = {loggedIN?.firstName || "Guest"}
          />
          <TotalBalanceBox
          accounts={[]}
          totalBanks={0}
          totalCurrentBalance={12345.45}
        />
        </header>
      </div>
      <RightSidebar user={loggedIN} transactions={[]} banks={[{currentBalance: 123.50}, {currentBalance: 12000}]} />
    </section>
  )
}

export default Home
