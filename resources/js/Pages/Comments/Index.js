import Layout from "../../Shared/Layout";
import Pagination from "../../Shared/Pagination";
import SearchFilter from "../../Shared/SearchFilter";
import CommentRow from "./CommentRow";


const CommentIndex = (props) => {
    const {data, links}= props.comments;
  return (
    <div>
        <div className="lg:flex block items-center justify-between mb-2">
            <h1 className="mb-8 text-3xl font-bold">Comments</h1>
            <SearchFilter />
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full border-separate" style={{ borderSpacing: "0 1em"}}>

                    <tbody>
                      {data.map(comment => (
                        <CommentRow key={comment.id} comment={comment}/>
                        ))}
                    </tbody>
                </table>
        </div>
        <Pagination links={links}/>
    </div>
  )
}



CommentIndex.layout = (page) => <Layout title="Comments" children={page} />;


export default CommentIndex




