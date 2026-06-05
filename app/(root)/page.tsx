import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
const Home = () => {
  let loggedIN = {
    firstName: "Shruti",
    lastName: "Jain",
    email: "sj@gmail.com"
  }
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
