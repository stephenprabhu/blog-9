import {useEffect, useState} from 'react'
import Layout from '../../Shared/Layout';
import { Link } from '@inertiajs/inertia-react';
import CreateCategoryModal from './CategoryFormModal';
import CategoryRow from './CategoryRow';


const CategoryIndex = ({categories,editing}) => {
    const {data, links} = categories;
    const [categoryFormModalOpened, setCategoryFormModalOpened]=useState(false);

    useEffect(()=>{
        if(editing){
            setCategoryFormModalOpened(true);
        }
    },[]);

  return (
    <div>
          <div className="lg:flex block items-center justify-between mb-6">
          <h1 className="mb-8 text-3xl font-bold">Categories</h1>
                {/* <SearchFilter /> */}
                <Link
                preserveState
                className="btn-indigo focus:outline-none"
                onClick={()=>setCategoryFormModalOpened(true)}
                >
                <span>Create</span>
                <span className="hidden md:inline"> Category</span>
                </Link>
            </div>
          <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full whitespace-nowrap ">
                    <thead>
                        <tr className="font-bold text-left ">
                            <th className=" pt-2 pl-3 pb-2">#</th>
                            <th className=" pt-2 pb-2">Image</th>
                            <th className="pt-2 pb-2">Name</th>
                            <th className=" pt-2 pb-2">Description</th>
                            <th className=" pt-2 pb-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((category, index)=>(
                            <CategoryRow category={category} key={index} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateCategoryModal opened={categoryFormModalOpened} setOpened={setCategoryFormModalOpened} />
    </div>
  )
}

CategoryIndex.layout = page => <Layout title="Categories" children={page} />


export default CategoryIndex
