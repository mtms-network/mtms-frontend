import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    GroupTitle,
    MainLayout,
    AlertError,
    BrandLogoLoading, GroupLayout, TextArea,
} from "components";
import { IoTv } from "react-icons/io5";
import * as yup from "yup";
import moment from "moment";
import {ALERT_TYPE, routeUrls} from "configs";
import { useNavigate } from "react-router-dom";
import {
    getRequirePreMeeting,
    getMeetingContact, createInstantMeeting, getMeetingDetail, updateInstantMeeting,
} from "services";
import {useTranslation} from "react-i18next";
import { Formik } from "formik";
import FormSelect from "../../../components/Forms/SelectMultiTag";

import FormInput from "../../../components/Forms/Input";
import FormBase from "../../../components/Forms/Base";
import LiveTime from "./LiveTime";
import AdditionalTime from "./AdditionalTime";
import {Editor} from "react-draft-wysiwyg";
import {handleHttpError} from "../../../helpers";
import {message} from "antd";
import draftToHtml from "draftjs-to-html";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";

/**
 * action = 1 // create
 * action = 2 // update
 * action = 3 // duplicate
 */

const Form = ({ action , id }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [types, setTypes] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [initialValues, setInitialValues] = useState({
        title: "",
        agenda: "",
        description: "",
        type: null,
        roomType: "",
        live_time: {
            date: moment(),
            time: moment(),
            loop: "d",
        },
        time_slot: [{
            date: moment(),
            time: moment(),
            loop: "d",
        }],
        live_topic: "",
        contacts: [],
        max_participant_count: 50,
        identifier: "",
        room: true,
        is_paid: false,
        is_pam: false,
        fee: 0,
        speaker: "",
    });
    const [listContacts, setListContacts] = useState([]);

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: ALERT_TYPE.ERROR,
        error: [],
    });

    const fetchContact = async () => {
        try {
            const res = await getMeetingContact();
            if (res) {
                const list = res.data.map((item) => ({
                    ...item,
                    key: item.uuid,
                    value: item.name,
                }));

                await setListContacts(list);
            }
        } catch (err) {
            console.log('fetch fetchContact fail');
        }
    };

    const fetchType = async () => {
        try {
            const res = await getRequirePreMeeting();
            await setTypes(res?.types || []);
            await setRoomTypes(res?.liveTypes || []);

            const init = {...initialValues};

            if(res?.types?.length > 0 && !initialValues.type){
                init.type = res?.types[0];
            }

            if(res?.liveTypes?.length > 0 && !initialValues.roomType){
                init.roomType = res?.liveTypes[0].uuid;
            }

            setInitialValues(init);
        }catch (err){
            console.log('fetch fetchType fail');
        }
    };

    const fetchData = async () => {
        try {
            setFetchLoading(true);
            await fetchContact();
            await fetchType();

            if(action > 1)
            {
                const res = await getMeetingDetail(id);
                if(res){
                    const init = {...initialValues};

                    init.title = res?.title;
                    init.live_topic = res?.live_topic;
                    init.type = res?.type;
                    init.roomType = res?.roomType?.uuid;
                    init.max_participant_count = res?.max_participant_count;
                    init.identifier = res?.identifier;
                    init.speaker = res?.speaker;

                    if(res?.description){
                        init.description = EditorState.createWithContent(
                                    ContentState.createFromBlockArray(convertFromHTML(res?.description || "")),
                                )
                    }

                    if(Array.isArray(res?.time_slot)){
                        init.time_slot = res?.time_slot?.map((item) => {
                            if(item?.date){
                                item.date = moment(item.date);
                                item.time = moment(item.date);
                            }

                            return item;
                        })
                    }

                    if(res?.live_time?.date){
                        init.live_time.date = moment(res?.live_time?.date);
                        init.live_time.time = moment(res?.live_time?.date);
                        init.live_time.loop = res?.live_time?.loop || 'd';
                    }

                    setInitialValues(init);
                }

                // setInitialValues(res);
                // if(res)
                // {
                //     setType(res.type.uuid);
                //     setValue("agenda", res.agenda);
                //     setRoomType( res?.roomType || null);
                //     setValue("title", res.title);
                //     if (action !== 3) {
                //         setValue("identifier", res.identifier);
                //     }
                //     setValue("max_participant_count", res.max_participant_count);
                //     const startDate = moment(res.start_date_time, "YYYY-MM-DD");
                //     const time = moment(res.start_date_time);
                //
                //     if (action === 3) {
                //         const now = moment();
                //         const diffDays = startDate.diff(now.startOf("day"), "days");
                //         if (diffDays <= 0) {
                //             const diffHours = time.diff(now.startOf("hour"), "hours");
                //             if (diffHours <= 0) {
                //                 setStartTime(moment());
                //             } else {
                //                 setStartTime(time);
                //             }
                //             setStartDateTime(now);
                //         } else {
                //             setStartDateTime(startDate);
                //         }
                //     } else {
                //         setStartDateTime(startDate);
                //         setStartTime(time);
                //     }
                //
                //     setDescription(
                //         EditorState.createWithContent(
                //             ContentState.createFromBlockArray(convertFromHTML(res?.description || "")),
                //         ),
                //     );
                //
                //     const currentContacts = [];
                //     res.invitees.map((item) => {
                //         currentContacts.push({
                //             ...item,
                //             key: item.contact.uuid,
                //             value: item.contact.name || item.contact.email,
                //         });
                //         return 1;
                //     });
                //     setContacts(currentContacts);
                //}
            }

            setFetchLoading(false);
        } catch (error) {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, [id]);

    const renderTitle = () => {
        switch (action)
        {
            case 1: return "Create Live Room";
            case 2: return "Edit Live Room";
            case 3: return "Duplicate Live Room";
            default: return "";
        }

        return "";
    }

    return (
        <MainLayout>
            <div className="pt-4 w-full">
                <AlertError
                    {...{ ...alert }}
                    onClose={() => {
                        setAlert({ ...alert, show: false });
                    }}
                />
            </div>
            {fetchLoading && (
                <div className="h-96">
                    <BrandLogoLoading />
                </div>
            )}
            {!fetchLoading && (
                <Formik
                    enableReinitialize={true}
                    initialValues={{...initialValues}}
                    validationSchema={
                        yup.object().shape({
                            title: yup.string().required(),
                            type: yup.mixed().required(),
                            live_topic: yup.string().required(),
                            max_participant_count: yup.number().min(1),
                        })
                    }
                    onSubmit={ async (values) => {
                        const clone = Object.assign({}, values);
                        clone.live_time = {...values.live_time};
                        clone.live_time.date = clone?.live_time?.date && moment.isMoment(clone?.live_time?.date) ? moment(clone?.live_time?.date).format("YYYY-MM-DD HH:mm:ss") : "";
                        clone.live_time.time = clone?.live_time?.time && moment.isMoment(clone?.live_time?.time) ? moment(clone?.live_time?.time).format("HH:mm") : "";

                        clone.time_slot = [...values.time_slot];
                        clone.time_slot = clone?.time_slot?.map((item) => {
                            return {
                                ...item,
                                date: item?.date && moment.isMoment(item.date) ? moment(item.date).format("YYYY-MM-DD HH:mm:ss") : "",
                                time: item?.time && moment.isMoment(item.time) ? moment(item.time).format("HH:mm") : ""
                            }
                        })

                        clone.contacts = contacts.map((value) => {
                            if (typeof value === "object" && value?.uuid) {
                                value = value.uuid;
                            }
                            return { uuid: value };
                        });

                        clone.description = clone?.description
                            ? draftToHtml(convertToRaw(clone.description?.getCurrentContent()))
                            : "";

                        await setLoading(true);
                        if(action === 1){ // action
                            clone.uuid = null;
                        }else if(action === 2){ // update
                            //delete clone.identifier;
                            clone.uuid = id;
                        }else if(action === 3){ // duplicate
                            clone.uuid = null;
                        }

                        let res = null;

                        if(action === 2){
                            res = await updateInstantMeeting(id, clone);
                        }else{
                            res = await createInstantMeeting(clone);
                        }

                        if (res?.status === 200) {
                            message.success(res?.data?.message);
                            navigate(`/${routeUrls.exploreRoom.path}`);
                        } else if (res?.request) {
                            const errorData = handleHttpError(res);
                            message.error(errorData.messageDetail);
                        }
                        setLoading(false);
                    }}
                >
                    {
                        (formik) => {
                            return (
                                <>
                                    <div className="flex flex-row justify-between w-full py-2">
                                        <div className="flex-1 text-center">
                                            <GroupTitle icon={<IoTv />} title={renderTitle()} />
                                        </div>
                                    </div>
                                    <div className="w-[90%] m-auto bg-white rounded-[20px] md:w-[80%] lx:w-[60%]">
                                        <form>
                                            <FormInput
                                                mgsError={formik.errors?.title}
                                                isRequired={true}
                                                label={"Title"}
                                                name={"title"}
                                                value={formik.values?.title}
                                                onChange={formik.handleChange}
                                                placeholder={t("schedule_meeting.enter_title_meeting")}
                                            />

                                            <FormInput
                                                isRequired={false}
                                                label={"Speaker"}
                                                name={"speaker"}
                                                value={formik.values?.speaker}
                                                onChange={formik.handleChange}
                                                placeholder={"Enter speaker"}
                                            />

                                            {/* <FormBase */}
                                            {/*     className={''} */}
                                            {/*     label={"Type"} */}
                                            {/* > */}
                                            {/*     <div> */}
                                            {/*         {types && */}
                                            {/*             types.slice(0, 1).map((item, key) => { */}
                                            {/*                 return ( */}
                                            {/*                     <span */}
                                            {/*                         key={key} */}
                                            {/*                         className={`inline-flex mr-2 my-1 rounded-[20px] px-[12px] py-[6px] bg-slate-base cursor-pointer${ */}
                                            {/*                             formik.values.type?.uuid === item.uuid ? " bg-secondary text-primary" : "" */}
                                            {/*                         }`} */}
                                            {/*                         onClick={() => { */}
                                            {/*                             formik.setFieldValue("type", item) */}
                                            {/*                         }} */}
                                            {/*                     > */}
                                            {/*         {item.name} */}
                                            {/*     </span> */}
                                            {/*                 ); */}
                                            {/*             }) */}
                                            {/*         } */}
                                            {/*     </div> */}
                                            {/* </FormBase> */}

                                            <FormBase
                                                className={''}
                                                label={"Room type"}
                                            >
                                                {roomTypes &&
                                                    roomTypes.map((item, key) => {
                                                        return (
                                                            <span
                                                                key={key}
                                                                className={`inline-flex mr-2 my-1 rounded-[20px] px-[12px] py-[6px] bg-slate-base cursor-pointer${
                                                                    formik.values.roomType === item.uuid ? " bg-secondary text-primary" : ""
                                                                }`}
                                                                onClick={() => {
                                                                    formik.setFieldValue("roomType", item.uuid)
                                                                }}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        );
                                                    })
                                                }
                                            </FormBase>

                                            <LiveTime formik={formik} />
                                            <AdditionalTime formik={formik} />

                                            <FormInput
                                                isRequired={true}
                                                label={<div className="text-red-500">Live topic</div>}
                                                name={"live_topic"}
                                                mgsError={formik.errors?.live_topic}
                                                value={formik.values?.live_topic}
                                                onChange={formik.handleChange}
                                                placeholder={"Enter live topic"}
                                            />

                                            <div className="w-full sm:flex sm:flex-row sm:justify-between">
                                                <div className="flex-1">
                                                    <FormInput
                                                        type={"number"}
                                                        mgsError={formik.errors?.max_participant_count}
                                                        label={"Maximum participant"}
                                                        name={"max_participant_count"}
                                                        value={formik.values?.max_participant_count}
                                                        onChange={formik.handleChange}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <FormInput
                                                        label={"Meeting ID"}
                                                        name={"identifier"}
                                                        value={formik.values?.identifier}
                                                        onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <FormSelect
                                                isMulti={true}
                                                label={t("meeting.config.email_invite")}
                                                mode="tags"
                                                placeholder={t("schedule_meeting_new.select_invitees")}
                                                value={contacts}
                                                onChange={(e) => setContacts(e)}
                                                options={listContacts}
                                            />

                                            <GroupLayout className="flex flex-col justify-between">
                                                <TextArea
                                                    className="w-full"
                                                    name={"agenda"}
                                                    value={formik.values?.agenda}
                                                    onChange={formik.handleChange}
                                                    label={t("meeting.props.agenda")}
                                                    placeholder={t("schedule_meeting_new.enter_agenda_meeting")}
                                                />
                                            </GroupLayout>
                                            <GroupLayout className="flex flex-col justify-between">
                                                <Editor
                                                    editorState={formik.values?.description}
                                                    toolbarClassName="toolbarClassName rounded-lg"
                                                    wrapperClassName="wrapperClassName bg-slate-base rounded-lg"
                                                    editorClassName="editorClassName px-2"
                                                    placeholder="Enter Description"
                                                    onEditorStateChange={(editor) => {
                                                        formik.setFieldValue("description", editor)
                                                    }}
                                                    name={"description"}
                                                />
                                            </GroupLayout>
                                        </form>
                                        <div className="w-full sm:flex sm:flex-row justify-between pt-2 pb-8 space-y-2 sm:space-y-0">
                                            <div className="w-full flex justify-center items-center">
                                                <Button
                                                    className="btn btn-primary btn-outline mr-4"
                                                    type="submit"
                                                    onClick={() => {
                                                        navigate(`/${routeUrls.liveRoom.path}`);
                                                    }}
                                                    disabled={loading}
                                                >
                                                    {t("general.cancel")}
                                                </Button>
                                                <Button
                                                    className="btn btn-primary"
                                                    isLoading={loading}
                                                    type="submit"
                                                    onClick={formik.handleSubmit}
                                                >
                                                    {action !== 2 ? "Public" : "Update"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    }
                </Formik>
            )}
        </MainLayout>
    );
};

export default Form;
