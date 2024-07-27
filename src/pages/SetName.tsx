import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/context";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../assets/icons/solid/comments.svg?react";

export default function SetName() {
    const { name, setName } = useContext(UserContext);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (name) {
            document.title = `设置名称 - ${name}`;
        } else {
            document.title = "设置名称";
        }
    }, [name]);

    const BtnCls = value.trim() === "" ? "btn btn-disabled" : "btn btn-primary";

    return (<div className='h-full flex flex-col items-center justify-center'>
        <div className='card bg-base-100 w-96 shadow-xl overflow-hidden
            flex items-center'>
            <div className='w-full h-32 
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                flex items-center justify-center'>
                <div className="size-16">
                    <LogoIcon className="fill-slate-900" />
                </div>
            </div>

            <div className="card-body w-full p-6">
                <h2 className="card-title">设置昵称</h2>
                <input
                    type="text"
                    placeholder="你的昵称"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="input input-bordered input-primary w-full my-4" />
                <div className="card-actions justify-end">
                    <button className={BtnCls}
                        onClick={() => {
                            setName && setName(value);
                            setValue("");
                            navigate("../");
                        }}>提交</button>
                </div>
            </div>

        </div>
    </div>);
}