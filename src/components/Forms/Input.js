import React from "react";

const Input = ({
    label = "",
    isRequired = false,
    placeholder = "",
    name = "",
    type = "text",
    mgsError = "",
    onChange = null,
    value = "",
}) => {

    return (
        <div className="p-4 border-group border-white bg-white rounded-2xl flex flex-col justify-between">
            <div className="w-full h-auto">
                <div className="form-control">
                    {
                        label && (
                            <div>
                                <div className="pb-1 flex items-center justify-between">
                                    <p className="label-text text-black text-base">
                                        { label }
                                        { isRequired && <span className="inline-block ml-1 text-error">*</span> }
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    <div className="relative w-full flex items-center justify-center">
                        <div className="absolute left-3"></div>
                        <input
                            value={value}
                            type={type}
                            className={`input input-bordered w-full text-black bg-slate-base border-0 rounded-full w-full ${mgsError?.length ? "input-error" : ""}`}
                            name={name}
                            placeholder={placeholder}
                            onChange={() => {
                                onChange && onChange();
                            }}
                        />
                        <div className="absolute right-4"></div>
                    </div>
                </div>
                {
                    mgsError?.length > 0 && (
                        <label className="label py-1 pb-0">
                            <span className="label-text-alt text-error">{ mgsError }</span>
                        </label>
                    )
                }
            </div>
        </div>
    )
}

export default Input;
