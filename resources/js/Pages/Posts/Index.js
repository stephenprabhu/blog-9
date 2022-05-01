import Layout from "../../Shared/Layout";
import { Link } from "@inertiajs/inertia-react";
import SearchFilter from "../../Shared/SearchFilter";
import Pagination from "../../Shared/Pagination";
import PostRow from "./PostRow";

const PostIndex = (props) => {
    const {data, links}  = props.posts;


    return (
        <div>
            <div className="lg:flex block items-center justify-between mb-6">
            <h1 className="mb-8 text-3xl font-bold">Posts</h1>
                <SearchFilter extraOptions={true} />
                <Link
                className="btn-indigo focus:outline-none"
                href={route('posts.create')}
                >
                <span>Create</span>
                <span className="hidden md:inline"> Post</span>
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full whitespace-nowrap ">
                    <thead>
                        <tr className="font-bold text-left ">
                            <th className=" pt-2 pl-3 pb-2">#</th>
                            <th className=" pt-2 pb-2">Image</th>
                            <th className="pt-2 pb-2">Title</th>
                            <th className=" pt-2 pb-2">Status</th>
                            <th className=" pt-2 pb-2">Views</th>
                            <th className=" pt-2 pb-2">Created On</th>
                            <th className=" pt-2 pb-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((post, index) => (
                                <PostRow post={post} key={index} index={index} />

                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination links={links}/>
        </div>
    );
};

PostIndex.layout = (page) => <Layout title="Posts" children={page} />;

export default PostIndex;
