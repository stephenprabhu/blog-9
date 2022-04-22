import { Link } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import LoadingButton from "../../Shared/LoadingButton";
import Layout from "../../Shared/Layout";
import { PasswordInput, TextInput} from "@mantine/core";
import RoleSelect from "./RoleSelect";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

const UserForm = (props) => {
    const {editing, user} = props;
    const { data, setData, errors, post, put, processing } = useForm({
        name: "",
        slogan:"",
        email:"",
        password:"",
        password_confirmation:"",
        role:"",
    });

    useEffect(()=>{
        if(editing && user){
            setData({
                name: user.name,
                slogan: user.slogan,
                email: user.email,
                password: "",
                password_confirmation:"",
                role: String(user.role),
            });
        }
    },[editing, user]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(editing){
            put(route("users.update", user));
        }else{
            post(route("users.store"));
        }
    }

    const onPasswordResetClicked = ()=>{
        if(editing && user.email){
            console.log("INSIDE INErtia post");
            Inertia.post(route('password.email'),{'email':user.email});
        }
    }

  return (
    <div className="h-full">
    <h1 className="mb-8 text-3xl font-bold">
        <Link
            href={route("users.index")}
            className="text-indigo-600 hover:text-indigo-700"
        >
            Users
        </Link>
        <span className="font-medium text-indigo-600"> /</span> {editing ? "Edit":"Create"}
    </h1>
    <div className=" overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
                <TextInput
                    className="w-full pb-2 pr-6 lg:w-1/3"
                    label="Name"
                    error={errors.name || false}
                    value={data.name}
                    onChange={e => setData("name", e.target.value)}
                    placeholder="John Smith"
                    required
                />
                <TextInput
                    className="w-full pb-2 pr-6 lg:w-1/3"
                    label="Slogan (optional)"
                    error={errors.slogan || false}
                    value={data.slogan}
                    onChange={e => setData("slogan", e.target.value)}
                    placeholder="Author at Blogname"
                />
               <RoleSelect value={data.role} onChange={val => setData("role", val)} error={errors.role} />
                <TextInput
                    className="w-full pb-2 pr-6 lg:w-1/3"
                    label="Email"
                    type="email"
                    error={errors.email || false}
                    value={data.email}
                    onChange={e => setData("email", e.target.value)}
                    placeholder="name@example.com"
                />
                {!editing &&
                    <>
                        <PasswordInput
                            className="w-full pb-2 pr-6 lg:w-1/3"
                            placeholder="Password"
                            label="Password"
                            required={!editing}
                            error={errors.password || false}
                            value={data.password}
                            onChange={e => setData("password", e.target.value)}
                        />
                        <PasswordInput
                            className="w-full pb-2 pr-6 lg:w-1/3"
                            placeholder="Password"
                            label="Confirm Password"
                            required={!editing}
                            error={errors.password_confirmation || false}
                            value={data.password_confirmation}
                            onChange={e => setData("password_confirmation", e.target.value)}
                        />
                    </>
                }
            </div>

            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                {editing &&
                    <Link
                        href={route('password.email')}
                        method="post"
                        data={{email:user.email}}
                        className="btn-indigo"
                    >
                        Send Password Reset Email
                    </Link>
                }

                <LoadingButton
                    loading={processing}
                    type="submit"
                    className="btn-indigo ml-4"
                >
                    {editing ? "Update": "Create"} User
                </LoadingButton>
            </div>
        </form>
    </div>
</div>
  )
}

UserForm.layout = (page) => <Layout title="Users" children={page} />;


export default UserForm
