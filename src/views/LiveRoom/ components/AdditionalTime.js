import React from "react";
import moment from "moment";
import FormBase from "../../../components/Forms/Base";
import {DateTimePicker, TimePicker} from "../../../components";
import Select from "../../../components/base/Select";
import { PlusOutlined } from "@ant-design/icons";
import { FieldArray, useFormik } from 'formik';

const loop = [
    { value: `Daily`, key: 'd' },
    { value: `Weekly`, key: 'w' },
    { value: `Monthly`, key: 'm' },
];

const AdditionalTime = ({ formik }) => {
    const disabledDate = (current) => {
        return current && moment(current).add(1, "d") < moment().endOf("day");
    };

    return (
        <>
            <FieldArray
                name="time_slot"
            >
                <FormBase
                    label={(
                        <div className="flex items-center gap-2">
                            <div className="text-red-500">
                                Additional Time slot
                            </div>
                            <div
                                className={"flex items-center justify-center bg-white cursor-pointer rounded p-1 bg-primary"}
                                onClick={() => {
                                    const clone = [...formik.values?.time_slot];
                                    clone.push({
                                        date: moment(),
                                        time: moment(),
                                        loop: "d",
                                    })

                                    formik.setFieldValue("time_slot", clone);
                                }}
                            >
                                <PlusOutlined style={{fontSize: 12}} className={"text-white"} />
                            </div>
                        </div>
                    )}
                >
                    {
                        formik.values?.time_slot?.map((item, index) => {
                            return (
                                <div className="grid grid-cols-3 gap-2 mb-2" key={index}>
                                    <DateTimePicker
                                        disabledDate={disabledDate}
                                        name={`time_slot[${index}].date`}
                                        placeholder="Mar 2, 2022 5:02 PM"
                                        onChangeDateTime={(date) => {
                                            const time_slot = [...formik.values.time_slot]
                                            time_slot[index].date = date;
                                            formik.setFieldValue("time_slot", time_slot);
                                        }}
                                        format={"YYYY-MM-DD"}
                                        value={item.date}
                                    />
                                    <TimePicker
                                        name={`time_slot[${index}].time`}
                                        use12Hours
                                        value={item.time}
                                        format="hh:mm a"
                                        onChange={(time) => {
                                            const time_slot = [...formik.values.time_slot]
                                            time_slot[index].time = time;
                                            formik.setFieldValue("time_slot", time_slot);
                                        }}                                    />
                                    <Select
                                        name={`time_slot[${index}].loop`}
                                        options={loop}
                                        defaultValue={0}
                                        value={item.loop}
                                        onChange={(option) => {
                                            const time_slot = [...formik.values.time_slot]
                                            time_slot[index].loop = option;
                                            formik.setFieldValue("time_slot", time_slot);
                                        }}
                                    />
                                </div>

                            )
                        })
                    }
                </FormBase>
            </FieldArray>
        </>
    )
}

export default AdditionalTime;
