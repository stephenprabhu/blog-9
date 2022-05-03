import Layout from "../../Shared/Layout";
import { Link } from "@inertiajs/inertia-react";
import TagRow from "./TagRow";
import TagCreateModal from "./TagCreateModal";
import { useState, useEffect } from "react";

const TagIndex = ({tags, editing}) => {
    const [tagFormModalOpened, setTagFormModalOpened]=useState(false);

    useEffect(()=>{
        if(editing){
            setTagFormModalOpened(true);
        }
    },[]);

  return (
    <div>
    <div className="lg:flex block items-center justify-between mb-6">
    <h1 className="mb-8 text-3xl font-bold">Tags</h1>
        <Link
            preserveState
            className="btn-indigo focus:outline-none"
            onClick={()=>setTagFormModalOpened(true)}
        >
        <span>Create</span>
        <span className="hidden md:inline"> Tag</span>
        </Link>
    </div>
    <div className="overflow-x-auto bg-white rounded shadow">
        {tags && tags.length > 0 ?
            <table className="w-full whitespace-nowrap ">
            <thead>
                <tr className="font-bold text-left ">
                    <th className=" pt-2 pl-3 pb-2">#</th>
                    <th className=" pt-2 pb-2">Name</th>
                    <th className=" pt-2 pb-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tags.map((tag, index)=>(
                   <TagRow key={index} tag={tag} index={index} />
                ))}
            </tbody>
            </table>
        :
            <p className='mx-3 my-6 text-lg'>No Tags Found. Click <span className='font-bold'>Create Tag</span> To Create One.</p>
        }

    </div>
    <TagCreateModal opened={tagFormModalOpened} setOpened={setTagFormModalOpened} />
</div>
  )
}

TagIndex.layout = (page) => <Layout title="Tags" children={page} />;

export default TagIndex
