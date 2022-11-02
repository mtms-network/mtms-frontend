import React from "react";
import FormBase from "../../../components/Forms/Base";
import {DateTimePicker, TimePicker} from "../../../components";
import moment from "moment/moment";
import Select from "../../../components/base/Select";

const loop = [
    { value: `Daily`, key: 'd' },
    { value: `Weekly`, key: 'w' },
    { value: `Monthly`, key: 'm' },
];

const LiveTime = ({ formik }) => {

    const disabledDate = (current) => {
        return current && moment(current).add(1, "d") < moment().endOf("day");
    };

    return (
        <>
            <FormBase
                label={"Live time"}
            >
                <div className="grid grid-cols-3 gap-2">
                    <DateTimePicker
                        disabledDate={disabledDate}
                        placeholder="Mar 2, 2022 5:02 PM"
                        onChangeDateTime={(date) => {
                            const live_time = {...formik.values?.live_time}
                            live_time.date = date;
                            formik.setFieldValue("live_time", live_time);
                        }}
                        format={"YYYY-MM-DD"}
                        value={formik.values?.live_time?.date}
                    />
                    <TimePicker
                        use12Hours
                        value={formik.values?.live_time?.time}
                        format="HH:mm a"
                        onChange={(time) => {
                            const live_time = {...formik.values.live_time}
                            live_time.time = time;
                            formik.setFieldValue("live_time", live_time);
                        }}
                    />
                    <Select
                        multiTag={false}
                        options={loop}
                        // defaultValue={"d"}
                        value={formik.values?.live_time?.loop}
                        onChange={(option) => {
                            const live_time = {...formik.values.live_time}
                            live_time.loop = option;
                            formik.setFieldValue("live_time", live_time);
                        }}
                    />
                </div>
            </FormBase>
        </>
    )
}

export default LiveTime;
