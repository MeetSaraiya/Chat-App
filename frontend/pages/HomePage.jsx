import React from 'react'
import { useAuthStore } from '../store/authStore'
import { LoaderCircle } from 'lucide-react';


const HomePage = () => {
    const {authUser,isCheckingAuth} = useAuthStore();
    if(isCheckingAuth && !authUser)
        return <div className='flex flex-column justify-center items-center h-screen'>
            <LoaderCircle className='size-[100px] animate-spin'/>
        </div>
    
    return (
        <div>
            Homepage,
            <br />
            User : {authUser.name} and {authUser.email}
        </div>
    )
}

export default HomePage
