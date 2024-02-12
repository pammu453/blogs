import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';

const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState("");

    useEffect(() => {
        const userParams = new URLSearchParams(location.search)
        const tabFromUrl = userParams.get("tab")
        setTab(tabFromUrl)
    }, [location.search])
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                   
                        <Sidebar.Item to={'/dashboard?tab=profile'} active={tab === "profile"} icon={HiUser} label={"User"} labelColor="dark">
                            Profile
                        </Sidebar.Item>
                   
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
