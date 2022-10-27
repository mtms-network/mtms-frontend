import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    DateTimePicker,
    GroupLayout,
    GroupTitle,
    Input,
    MainLayout,
    Select,
    TextArea,
    AlertError,
    BrandLogoLoading,
    TimePicker,
} from "components";
import { IoOptions, IoTv } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMeetingStore } from "stores/meeting.store";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import {ALERT_TYPE, routeUrls, COMMON, MEETING_STATUS} from "configs";
import { handleHttpError } from "helpers";
import { useNavigate, useParams } from "react-router-dom";
import {
    createInstantMeeting,
    getMeetingContact,
    getMeetingDetail,
    getRequirePreMeeting,
    sendEmailToMemberInMeeting, updateInstantMeeting
} from "services";
import {useTranslation, withTranslation} from "react-i18next";
import moment from "moment";
import { message } from "antd";
import { useFormik } from "formik";

import FormInput from "../../../components/Forms/Input";
import FormSelect from "../../../components/Forms/SelectMultiTag";
import FormTextarea from "../../../components/Forms/Textarea";
import FormBase from "../../../components/Forms/Base";

const timeFormat = "MMM DD, yyyy";

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
    const [meetingStore] = useMeetingStore();
    const [description, setDescription] = useState(null);
    const [startDateTime, setStartDateTime] = useState(moment());
    const [contacts, setContacts] = useState([]);
    const [type, setType] = useState(null);
    const [startTime, setStartTime] = useState(moment());
    const [types, setTypes] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [roomType, setRoomType] = useState(null);
    const [initialValues, setInitialValues] = useState({});
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: ALERT_TYPE.ERROR,
        error: [],
    });

    const [listContacts, setListContacts] = useState([]);

    const schema = yup.object().shape({
        title: yup.string().required(),
        agenda: yup.string(),
        max_participant_count: yup
            .number()
            .min(
                1,
                t("validation.min.numeric", {
                    attribute: t("home.maximum_participant"),
                    min: 1,
                }),
            )
            .max(
                COMMON.MAX_PARTICIPANT,
                t("validation.max.numeric", {
                    attribute: t("home.maximum_participant"),
                    max: COMMON.MAX_PARTICIPANT,
                }),
            ),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            title: yup.string().required(),
        }),
        enableReinitialize: true,
        onSubmit: async () => {

        }
    })

    const onCreate = async (values) => {
        try {
            const data = { ...values };
            setAlert({ ...alert, show: false, message: "" });
            setLoading(true);

            data.description = description
                ? draftToHtml(convertToRaw(description?.getCurrentContent()))
                : "";
            data.is_paid = false;
            data.is_pam = false;
            data.uuid = null;
            startDateTime.set("hour", startTime.hours());
            startDateTime.set("minute", startTime.minutes());
            startDateTime.set("second", startTime.seconds());
            data.start_date_time = startDateTime.format("YYYY-MM-DD HH:mm:ss");
            data.contacts = contacts.map((value) => {
                return { uuid: value };
            });
            data.room = true;
            data.type = { uuid: type };

            const res = await createInstantMeeting(data);

            if (res?.data) {
                navigate(`/${routeUrls.liveRoom.path}`);
                message.success(res?.data?.message);
            } else if (res?.request) {
                const errorData = handleHttpError(res);
                message.error(errorData.messageDetail);
            }
            setLoading(false);
        } catch (error) {
            if (error) {
                const errorData = handleHttpError(error);
                message.error(errorData?.message);
            }
            setLoading(false);
        }
    }

    const onUpdate = async (values) => {
        const data = { ...values };
        try {
            setAlert({ ...alert, show: false, message: "" });
            setLoading(true);
            data.description = description
                ? draftToHtml(convertToRaw(description?.getCurrentContent()))
                : "";
            data.is_paid = false;
            data.is_pam = false;
            data.uuid = id;
            data.room = true;

            startDateTime.set("hour", startTime.hours());
            startDateTime.set("minute", startTime.minutes());
            startDateTime.set("second", startTime.seconds());
            data.start_date_time = startDateTime.format("YYYY-MM-DD HH:mm:ss");
            data.roomType = roomType;

            data.contacts = contacts.map((value) => {
                if (typeof value === "object" && value?.uuid) {
                    value = value.uuid;
                }
                return { uuid: value };
            });
            data.type = { uuid: type };

            const res = await updateInstantMeeting(id, data);
            if (res?.data) {
                navigate(`/${routeUrls.liveRoom.path}`);
                message.success(res?.data?.message);
            } else if (res?.request) {
                const errorData = handleHttpError(res);
                message.error(errorData.messageDetail);
            }
            setLoading(false);
        } catch (error) {
            if (error) {
                const errorData = handleHttpError(error);
                message.error(errorData.message);
            }
            setLoading(false);
        }
    };

    const onDuplicate = async (values) => {
        try {
            const data = { ...values };
            setLoading(true);

            data.description = description
                ? draftToHtml(convertToRaw(description?.getCurrentContent()))
                : "";
            data.is_paid = false;
            data.is_pam = false;
            data.uuid = null;
            data.room = true;
            startDateTime.set("hour", startTime.hours());
            startDateTime.set("minute", startTime.minutes());
            startDateTime.set("second", startTime.seconds());
            data.start_date_time = startDateTime.format("YYYY-MM-DD HH:mm:ss");
            data.contacts = contacts.map((value) => {
                if (typeof value === "object" && value?.uuid) {
                    value = value.uuid;
                }
                return { uuid: value };
            });
            data.type = { uuid: type };
            data.roomType = roomType;
            const res = await createInstantMeeting(data);

            if (res?.data) {
                navigate(`/${routeUrls.liveRoom.path}`);
                message.success(res?.data?.message);
            } else if (res?.request) {
                const errorData = handleHttpError(res);
                message.error(errorData.messageDetail);
            }
            setLoading(false);
        } catch (error) {
            if (error) {
                const errorData = handleHttpError(error);
                message.error(errorData?.message);
            }
            setLoading(false);
        }
    };

    const onSubmit = async (values) => {
        if(action === 1){
            await onCreate(values);
        }else if(action === 2){
            await onUpdate(values);
        }else if(action === 3){
            await onDuplicate(values);
        }
    };

    const onChangeDateTime = (e) => {
        // eslint-disable-next-line no-underscore-dangle
        const ed = e?._d;
        setStartDateTime(
            moment(
                `${ed.getFullYear()}-${(ed.getMonth() + 1).toString().padStart(2, "0")}-${ed
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${ed.getHours().toString().padStart(2, "0")}:${ed
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${ed.getSeconds().toString().padStart(2, "0")}`,
                "YYYY-MM-DD",
            ),
        );
    };

    const onChangeStartTime = (value) => {
        const time = moment(value, "hh:mm:ss");
        setStartTime(time);
    };

    const fetchContact = async () => {
        try {
            const res = await getMeetingContact();
            if (res) {
                const list = res.data.map((item) => ({
                    ...item,
                    key: item.uuid,
                    value: item.name,
                }));
                setListContacts(list);
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

                setInitialValues(res);
                if(res)
                {
                    setType(res.type.uuid);
                    setValue("agenda", res.agenda);
                    setRoomType( res?.roomType || null);
                    setValue("title", res.title);
                    if (action !== 3) {
                        setValue("identifier", res.identifier);
                    }
                    setValue("max_participant_count", res.max_participant_count);
                    const startDate = moment(res.start_date_time, "YYYY-MM-DD");
                    const time = moment(res.start_date_time);

                    if (action === 3) {
                        const now = moment();
                        const diffDays = startDate.diff(now.startOf("day"), "days");
                        if (diffDays <= 0) {
                            const diffHours = time.diff(now.startOf("hour"), "hours");
                            if (diffHours <= 0) {
                                setStartTime(moment());
                            } else {
                                setStartTime(time);
                            }
                            setStartDateTime(now);
                        } else {
                            setStartDateTime(startDate);
                        }
                    } else {
                        setStartDateTime(startDate);
                        setStartTime(time);
                    }

                    setDescription(
                        EditorState.createWithContent(
                            ContentState.createFromBlockArray(convertFromHTML(res?.description || "")),
                        ),
                    );

                    const currentContacts = [];
                    res.invitees.map((item) => {
                        currentContacts.push({
                            ...item,
                            key: item.contact.uuid,
                            value: item.contact.name || item.contact.email,
                        });
                        return 1;
                    });
                    setContacts(currentContacts);
                }
            }

            setFetchLoading(false);
        } catch (error) {
            setFetchLoading(false);
        }
    };

    const disabledDate = (current) => {
        return current && moment(current).add(1, "d") < moment().endOf("day");
    };

    useEffect(() => {
        fetchData().then();
    }, [id]);

    useEffect(() => {
        if (types?.length && type === null) {
            setType(types[0].uuid);
        }

        if(roomTypes?.length && roomType === null){
            setRoomType(roomTypes[0]?.uuid);
        }
    }, [types]);

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
                <>
                    <div className="flex flex-row justify-between w-full py-2">
                        <div className="flex-1 text-center">
                            <GroupTitle icon={<IoTv />} title={renderTitle()} />
                        </div>
                    </div>
                    <div className="w-[90%] m-auto bg-white rounded-[20px] md:w-[80%] lx:w-[60%]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormInput
                                isRequired={true}
                                label={"Title"}
                                name={"title"}
                                value={formik.values?.title}
                                onChange={formik.handleChange}
                                placeholder={t("schedule_meeting.enter_title_meeting")}
                            />
                            <FormBase
                                className={''}
                                label={"Room type"}
                            >
                                <div>
                                    {types &&
                                        types.map((item, key) => {
                                            return (
                                                <span
                                                    key={key}
                                                    className={`rounded-[20px] px-[12px] py-[6px] bg-slate-base cursor-pointer${
                                                        type === item.uuid ? " bg-secondary text-primary" : ""
                                                    }`}
                                                    onClick={() => setType(item.uuid)}
                                                >
                                                    {item.name}
                                                </span>
                                            );
                                        })
                                    }
                                </div>
                            </FormBase>

                            <FormBase
                                className={''}
                                label={"Room type"}
                            >
                                {roomTypes &&
                                    roomTypes.map((item, key) => {
                                        return (
                                            <span
                                                key={key}
                                                className={`mr-2 rounded-[20px] px-[12px] py-[6px] bg-slate-base cursor-pointer${
                                                    roomType === item.uuid ? " bg-secondary text-primary" : ""
                                                }`}
                                                onClick={() => setRoomType(item.uuid)}
                                            >
                                                {item.name}
                                            </span>
                                        );
                                    })
                                }
                            </FormBase>

                            <GroupLayout className="w-full space-y-4">
                                <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                                    <div className="w-full sm:w-1/5">{t("meeting.view.start_time")}</div>
                                    <div className="w-full sm:w-2/5 mt-2 sm:mt-0">
                                        <DateTimePicker
                                            disabledDate={disabledDate}
                                            placeholder="Mar 2, 2022 5:02 PM"
                                            onChangeDateTime={onChangeDateTime}
                                            format={timeFormat}
                                            value={startDateTime}
                                        />
                                    </div>
                                    <div className="w-full sm:w-2/5 mt-2 sm:mt-0">
                                        <TimePicker
                                            use12Hours
                                            value={startTime}
                                            format="hh:mm a"
                                            onChange={onChangeStartTime}
                                        />
                                    </div>
                                </div>
                            </GroupLayout>
                            <GroupLayout className="flex flex-col justify-between">
                                <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                                    <div className="flex-1">
                                        <Input
                                            value={50}
                                            register={register("max_participant_count")}
                                            label={t("home.maximum_participant")}
                                            placeholder={COMMON.MAX_PARTICIPANT}
                                            type="number"
                                            error={errors.max_participant_count}
                                            min={1}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label={t("meeting.meeting_code")}
                                            placeholder={t("meeting.enter_meeting_code")}
                                            register={register("identifier")}
                                        />
                                    </div>
                                </div>
                            </GroupLayout>

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
                                    register={register("agenda")}
                                    label={t("meeting.props.agenda")}
                                    placeholder={t("schedule_meeting_new.enter_agenda_meeting")}
                                />
                            </GroupLayout>
                            <GroupLayout className="flex flex-col justify-between">
                                <Editor
                                    editorState={description}
                                    toolbarClassName="toolbarClassName rounded-lg"
                                    wrapperClassName="wrapperClassName bg-slate-base rounded-lg"
                                    editorClassName="editorClassName px-2"
                                    placeholder="Enter Description"
                                    onEditorStateChange={(editor) => {
                                        setDescription(editor);
                                    }}
                                    register={register("description")}
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
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    {action !== 2 ? "Public" : "Update"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    );
};

export default Form;
