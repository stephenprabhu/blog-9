import React from 'react'
import Layout from '../../Shared/Layout';
import { Link } from '@inertiajs/inertia-react';
import UserRow from './UserRow';
import SearchFilter from '../../Shared/SearchFilter';
import Pagination from '../../Shared/Pagination';

const UsersIndex = (props) => {
    const {data, links}  = props.users;

  return (
    <div>
        <div className="lg:flex block items-center justify-between mb-6">
            <h1 className="mb-8 text-3xl font-bold">Users</h1>
                <SearchFilter  extraOptions={false} />
                <Link
                    preserveState
                    className="btn-indigo focus:outline-none"
                    href={route('users.create')}
                >
                <span>Create</span>
                <span className="hidden md:inline"> User</span>
                </Link>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full whitespace-nowrap ">
                <thead>
                    <tr className="font-bold text-left ">
                        <th className=" pt-2 pl-3 pb-2">#</th>
                        <th className=" pt-2 pb-2">Image</th>
                        <th className=" pt-2 pb-2">Name</th>
                        <th className=" pt-2 pb-2">Email</th>
                        <th className=" pt-2 pb-2">Role</th>
                        <th className=" pt-2 pb-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index)=>(
                        <UserRow user={user} key={index} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
        <Pagination links={links}/>
    </div>
  )
}

UsersIndex.layout = (page) => <Layout title="Users" children={page} />;

export default UsersIndex
