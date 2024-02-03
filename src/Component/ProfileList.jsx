import { MdOutlineBedroomChild } from "react-icons/md";
import { LuUserCheck } from "react-icons/lu";
import { PiUserRectangle } from "react-icons/pi";
import { TbCalendarUser } from "react-icons/tb";
import { MdDownloadDone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

const ProfileList=
    [
        {
            id:1,
            icon:MdOutlineBedroomChild,
            namelist:'New Admin Home'
        },
        {
            id:2,
            icon:MdOutlineBedroomChild,
            namelist:'Admin Home'
        },
        {
            id:3,
            icon:LuUserCheck,
            namelist:'Quality User'
        },
        {
            id:4,
            icon:PiUserRectangle,
            namelist:'Manage Customers'
        },
        {
            id:5,
            icon:TbCalendarUser,
            namelist:'Custom Plan Management'
        },
        {
            id:6,
            icon:MdDownloadDone,
            namelist:'Suppression Lists'
        },
        {
            id:7,
            icon:FaRegUser,
            namelist:'Account & Billing'
        },
        {
            id:8,
            icon:HiLogout,
            namelist:'Log Out'
        }
    ]

    export default ProfileList;