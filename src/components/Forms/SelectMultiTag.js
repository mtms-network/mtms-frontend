import React from "react";
import {Select, Tag} from 'antd';
import classNames from "classnames";

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            closeIcon={<img src="/icons/icons/close-fill.svg" alt="close-icon" />}
            className="bg-secondary text-primary rounded-xl flex flex-row justify-center items-center"
        >
            {label}
        </Tag>
    );
};


const SelectMultiTag = ({
    label = "",
    isRequired = false,
    placeholder = "",
    name = "",
    mgsError = "",
    onChange = null,
    value = null,
    mode = "tags",
    isMulti = false,
    options = [],
    className = ""
}) => {
    const { Option } = Select;

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
                        <Select
                            tagRender={isMulti && tagRender}
                            bordered={false}
                            className={classNames(
                                "w-full text-black bg-slate-base min-h-6 h-auto px-8 py-2",
                                "input rounded-full",
                                "flex items-center",
                                "ml-0 pl-0",
                                mgsError && "input-error",
                                className,
                                isMulti && "rounded-2xl",
                            )}
                            name={name}
                            multiTag={isMulti}
                            label={label}
                            mode={mode}
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                        >
                            {options?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.name}
                                </Option>
                            ))}
                            <Option value="lucy">lucy</Option>

                        </Select>
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

export default SelectMultiTag;
