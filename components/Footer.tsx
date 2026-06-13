import Image from "next/image"
import { Logout } from "@/lib/actions/user.action";

const Footer = ({user, type= "desktop"}: FooterProps) => {
    const handlelogout = async () => {
        await Logout();
    }
  return (
    <footer className='footer'>
        <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
            <p className="text-xl">{user?.firstName[0]}</p>
        </div>
        <div  className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
            <h1  className="text-14 trucate font-normal text-gray-700 font-semibold"> {user?.firstName} {user.lastName}</h1>
            <p  className="text-14 trucate font-normal text-gray-600">{user.email}</p>
        </div>
        <div className="footer_image" onClick={handlelogout}>
            <Image src="icons/logout.svg" alt="logout icon" fill/>
        </div>
    </footer>
  )
}

export default Footer
