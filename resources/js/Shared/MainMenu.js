import React from 'react'
import MainMenuItem from './MainMenuItem';
import {MdDashboard, MdArticle, MdInsertComment, MdCategory, MdOutlineTag, MdSupervisedUserCircle,MdOutlineSettingsApplications } from "react-icons/md";
import { usePage } from '@inertiajs/inertia-react';
const MainMenu = ({className}) => {
    const { auth } = usePage().props;

  return (
    <div className={className}>
        <MainMenuItem text="Dashboard" link="dashboard" icon={MdDashboard} />
        <MainMenuItem text="Posts" link="posts.index" icon={MdArticle} />
        <MainMenuItem text="Comments" link="dashboard" icon={MdInsertComment} />
        <MainMenuItem text="Categories" link="categories.index" icon={MdCategory} />
        <MainMenuItem text="Tags" link="tags.index" icon={MdOutlineTag} />
        {auth.user.data.role === 2 && <MainMenuItem text="Users" link="users.index" icon={MdSupervisedUserCircle} />}
        <MainMenuItem text="Settings" link="dashboard" icon={MdOutlineSettingsApplications} />
    </div>
  )
}

export default MainMenu
