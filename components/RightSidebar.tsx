import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'

const RightSidebar = ({user, transactions, banks}: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
        <section className="flex flex-col pb-8">
            <div className="profile-banner">
                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-blue-500">{user.firstName[0]}</span>
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name text-xl font-semibold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="profile-email text-sm text-gray-600">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="banks">
            <div className="flex w-full justify-between mt-20">
                <h2 className="header-2">My Banks</h2>
                <Link
                    href="/"
                    className="flex gap-2"
                >

                    <Image src="/icons/plus.svg" width={20} height={20} alt="Add Bank" />
                    <h2 className="text-14 font-semibold text-gray-700">Add Bank</h2>
                </Link>

            </div>

            {banks?.length> 0 && (
                <div className="relative flex flex-col flex- 1 items-center justify-center gap-4 mt-4">
                    <div className="relative z-10">
                        <BankCard
                            key={banks[0].$id}
                            account={banks[0]}
                            userName={`${user.firstName} ${user.lastName}`}
                            showBalance={false}
                        ></BankCard>
                    </div>
                    {banks[1] && (
                        <div className="absolute right-0 z-0 top-8 w-[90%]">
                            <BankCard key={banks[1].$id} account={banks[1]} userName={`${user.firstName} ${user.lastName}`} showBalance={false}></BankCard>
                        </div>
                    )}
                </div>
            )}
        </section>
    </aside>
  )
}

export default RightSidebar
