import React from 'react'
import classNames from 'classnames';
import { Link } from '@inertiajs/inertia-react';
import {MdDashboard} from "react-icons/md";

const MainMenuItem = ({ icon, link, text }) => {
    const isActive = route().current(link + '*');
    const MenuIcon = icon;
    const iconClasses = classNames('w-4 h-4 mr-2', {
        'text-white fill-current': isActive,
        'text-indigo-400 group-hover:text-white fill-current': !isActive
    });

    const textClasses = classNames({
        'text-white': isActive,
        'text-indigo-200 group-hover:text-white': !isActive
    });

  return (
    <div  className="mb-2">
        <Link href={route(link)} className="flex items-center group py-2">
            <MenuIcon className={iconClasses} />
            {/* <MdDashboard  className={iconClasses} /> */}
            <div className={textClasses}>{text}</div>
        </Link>
    </div>
  )
}

export default MainMenuItem
