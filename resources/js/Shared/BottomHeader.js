import React,{useState} from 'react'
import { Link, usePage } from '@inertiajs/inertia-react';
import {MdOutlineArrowDownward} from "react-icons/md";

const BottomHeader = () => {
    const { auth } = usePage().props;
    const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
        <div className="relative">
            <div
            className="flex items-center cursor-pointer select-none group"
            onClick={() => setMenuOpened(true)}
            >
                <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
                    <span>{auth.user.first_name}</span>
                    <span className="hidden ml-1 md:inline">{auth.user.last_name}</span>
                </div>
                <MdOutlineArrowDownward  className="w-5 h-5 text-gray-800 fill-current group-hover:text-indigo-600 focus:text-indigo-600" />
            </div>
            <div className={menuOpened ? '' : 'hidden'}>
          <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            {/* <Link
                href={route('users.edit', auth.user.id)}
                className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                onClick={() => setMenuOpened(false)}

                >
                My Profile
              </Link> */}
              <Link
                href={route('logout')}
                className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                onClick={() => setMenuOpened(false)}
                method="post"
                >
                Logout
              </Link>
            </div>
            <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
            </div>
        </div>
    </div>
  )
}

export default BottomHeader
