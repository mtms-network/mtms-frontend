import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  MainLayout,
  AlertError,
} from "components";

import { createPrivateInstance } from "services/base";
import { BASE_API, ALERT_TYPE, LIVE_URL } from "configs";
import { FaPencilAlt, FaTrashAlt, FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAppStore } from "stores/app.store";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Upload, message, Modal } from 'antd';
import { handleHttpError, setTokenLoginSucceeded, getAccessToken } from "helpers";
import { withNamespaces } from 'react-i18next';
import { data } from "autoprefixer";

const { confirm } = Modal;

const Profile = ({ t }) => {
  const [appStore, updateAppStore] = useAppStore();
  const [loading, setLoading] = useState(false);
  const [fieldEdit, setFieldEdit] = useState({ name: false, phone: false, transaction_password: false });
  const [alert, setAlert] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR, error: [] });
  const [alertProfile, setAlertProfile] = useState({ show: false, message: "", type: ALERT_TYPE.ERROR, error: [] });
  const [formChangePassword, setFormChangePassword] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });
  const [formUpdateProfile, setFormUpdateProfile] = useState({ name: '', phone: '' });
  const [visible, setVisible] = useState(false);

  const token = getAccessToken();
  const user = appStore.user;
  const [avatar, setAvatar] = useState('https://api.lorem.space/image/face?hash=28212');
  //const 

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const propsUpload = {
    name: 'file',
    action: 'https://api.mtms.live/api/profile/avatar',
    headers: {
      Authorization: `Bearer ${token}`
    },
    onChange(info) {
      setLoading(true);
      if (info.file.status !== 'uploading') {

      }
      if (info.file.status === 'done') {
        setLoading(false);
        message.success(`${info.file.name} file uploaded successfully`);
        const newUser = { ...user, profile: { ...user.profile, avatar: info.file.response.avatar } };
        setTokenLoginSucceeded({ accessToken: token, user: newUser });
        updateAppStore((draft) => {
          draft.user = user;
        });
        setAvatar(LIVE_URL + info.file.response.avatar);
      } else if (info.file.status === 'error') {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const prepareData = () => {
    setFormUpdateProfile({ ...formUpdateProfile, name: user?.profile?.name, phone: user?.profile?.phone })
    if (user?.profile?.avatar) {
      setAvatar(LIVE_URL + user?.profile?.avatar);
    }
  };

  const updateProfile = async () => {
    try {
      setAlertProfile({ ...alertProfile, show: false, message: "" });
      setLoading(true);

      const client = createPrivateInstance(BASE_API.profile);
      const res = await client.post('', formUpdateProfile);
      const newUser = { ...user, profile: { ...user.profile, ...formUpdateProfile } };
      setTokenLoginSucceeded({ accessToken: token, user: newUser });
      updateAppStore((draft) => {
        draft.user = newUser;
      });

      setLoading(false);
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlertProfile({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message, error: errorData.detail });
      }
      setLoading(false);
    }
  };

  const submitChangePassword = async () => {
    try {
      setLoading(true);

      if (formChangePassword.new_password !== formChangePassword.new_password_confirmation) {
        setAlert({ ...alert, show: true, message: "Confirm Password Wrong!" });
        setLoading(false);
        return;
      }

      const client = createPrivateInstance(BASE_API.changePassword);
      const res = await client.post('', formChangePassword);

      setLoading(false);
      hideModal();
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        setAlert({ type: ALERT_TYPE.ERROR, show: true, message: errorData.message, error: errorData.detail });
      }
      setLoading(false);
    }
  }

  const handleDeleteAvatar = () => {
    confirm({
      title: 'Are you sure delete avatar?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteAvatar();
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  }

  const deleteAvatar = async () => {
    try {
      setLoading(true);
      const client = createPrivateInstance(BASE_API.avatar);
      const res = await client.delete('');
      if (res.data.status === 'success') {
        message.success(`File deleted successfully`);
        const newUser = { ...user, profile: { ...user.profile, avatar: null } };
        setTokenLoginSucceeded({ accessToken: token, user: newUser });
        updateAppStore((draft) => {
          draft.user = user;
        });
        setAvatar('https://api.lorem.space/image/face?hash=28212');
      }
      setLoading(false);
    } catch (error) {
      message.error(`Update failed.`);
      setLoading(false);
    }
  }

  useEffect(() => {
    prepareData();
  }, [user]);

  return (
    <MainLayout userCenter={true} >
      <div className="p-10">
        <AlertError
          {...{ ...alertProfile }}
          onClose={() => {
            setAlertProfile({ ...alertProfile, show: false });
          }}
        />
        <div className="mb-10">
          <h1 className="font-bold text-lg text-dark-base text-[24px]">{t('profile.edit')}</h1>
          <p>{t('profile.change_information')}</p>
        </div>
        <div className="flex mb-10">
          <div className="mr-[20px]">
            <img className="w-[150px] h-[150px] rounded-full object-cover" src={avatar} />
          </div>
          <div className="flex flex-col space-y-4">
            <Upload {...propsUpload}>
              <Button className="btn btn-primary" isLoading={loading}>
                <FaPencilAlt className="mr-2" />
                {t('profile.change_photo')}
              </Button>
            </Upload>
            <Button className="btn btn-primary" isLoading={loading} onClick={handleDeleteAvatar} >
              <FaTrashAlt className="mr-2" />
              {t('profile.delete_photo')}
            </Button>
          </div>
        </div>
        <div className="mb-20">
          <div className="flex flex-row justify-between space-x-4 mb-5">
            <div className="flex-1">
              {
                fieldEdit.name ?
                  (
                    <>
                      <Input placeholder="name" className="h-[65px]" value={formUpdateProfile.name || ''} onChange={(e) => setFormUpdateProfile({ ...formUpdateProfile, name: e.target.value })} />
                    </>
                  ) :
                  (
                    <div className="border-[1px] flex justify-between items-center rounded-[8px] py-2 px-3">
                      <div className="flex">
                        <FaUserCircle className="text-[20px] mr-2" /> {t('profile.username')}: {user?.profile?.name}
                      </div>
                      <Button className="btn btn-primary" isLoading={loading} onClick={() => setFieldEdit({ ...fieldEdit, name: true })}>
                        <FaPencilAlt className="mr-2" />
                        {t('profile.change')}
                      </Button>
                    </div>
                  )
              }
            </div>
            <div className="flex-1">
              <div className="border-[1px] flex justify-between items-center rounded-[8px] py-2 px-3 h-[65px]">
                <div className="flex">
                  <FaEnvelope className="text-[20px] mr-2" /> {user?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-4 mb-5">
            <div className="flex-1">
              <div className="border-[1px] flex justify-between items-center rounded-[8px] py-2 px-3">
                <div className="flex">
                  <FaUserCircle className="text-[20px] mr-2" /> {t('user.props.password')}: ......
                </div>
                <Button className="btn btn-primary" isLoading={loading} onClick={() => showModal(true)}>
                  <FaPencilAlt className="mr-2" />
                  {t('profile.change')}
                </Button>
              </div>
            </div>
            <div className="flex-1">
              {
                fieldEdit.phone ?
                  (
                    <>
                      <Input placeholder="Phone" className="h-[65px]" value={formUpdateProfile.phone || ''} onChange={(e) => setFormUpdateProfile({ ...formUpdateProfile, phone: e.target.value })} />
                    </>
                  ) :
                  (
                    <div className="border-[1px] flex justify-between items-center rounded-[8px] py-2 px-3">
                      <div className="flex">
                        <FaPhone className="text-[20px] mr-2" /> {user?.profile?.phone}
                      </div>
                      <Button className="btn btn-primary" isLoading={loading} onClick={() => setFieldEdit({ ...fieldEdit, phone: true })}>
                        <FaPencilAlt className="mr-2" />
                        {t('profile.change')}
                      </Button>
                    </div>
                  )
              }
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-4 mb-5">
            <div className="flex-1">
              {/* {
                fieldEdit.transaction_password ?
                  (
                    <>
                      <Input type="password" placeholder="Transaction Password" className="h-[65px]" />
                    </>
                  ) :
                  (
                    <div className="border-[1px] flex justify-between items-center rounded-[8px] py-2 px-3">
                      <div className="flex">
                        <FaUserCircle className="text-[20px] mr-2" /> Transaction Password: ......
                      </div>
                      <Button className="btn btn-primary" isLoading={loading} onClick={() => setFieldEdit({...fieldEdit, transaction_password: true})}>
                        <FaPencilAlt className="mr-2" />
                        Change
                      </Button>
                    </div>
                  )
              } */}
            </div>
            <div className="flex-1">
              <div className="border-[1px] flex justify-between items-center rounded-[8px] py-2 px-3 h-[65px]">
                <div className="flex">
                  <FaUserCircle className="text-[20px] mr-2" /> {t('profile.wallet')}: X-falfksfj53345ljalkfs
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="btn mr-3" isLoading={loading}>
            {t('general.cancel')}
          </Button>
          <Button className="btn btn-primary" isLoading={loading} onClick={updateProfile}>
            {t('profile.edit')}
          </Button>
        </div>
      </div>
      <Modal
        visible={visible}
        title={t('user.change_password')}
        onCancel={hideModal}
        footer={[
          <Button className="mr-2" key="back" onClick={hideModal}>
            {t('profile.return')}
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={submitChangePassword}>
            {t('general.submit')}
          </Button>,
        ]}
      >
        <div className="pt-4 w-full mb-3">
          <AlertError
            {...{ ...alert }}
            onClose={() => {
              setAlert({ ...alert, show: false });
            }}
          />
        </div>
        <div className="flex flex-row justify-between space-x-4 mb-5">
          <div className="flex-1">
            <label>{t('auth.password.props.current_password')}:</label>
            <Input type={'password'} placeholder={t('auth.password.props.current_password')} onChange={(e) => setFormChangePassword({ ...formChangePassword, current_password: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-row justify-between space-x-4 mb-5">
          <div className="flex-1">
            <label>{t('auth.password.props.new_password')}:</label>
            <Input type={'password'} placeholder={t('auth.password.props.new_password')} onChange={(e) => setFormChangePassword({ ...formChangePassword, new_password: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-row justify-between space-x-4 mb-5">
          <div className="flex-1">
            <label>{t('auth.password.props.new_password_confirmation')}:</label>
            <Input type={'password'} placeholder={t('auth.password.props.new_password_confirmation')} onChange={(e) => setFormChangePassword({ ...formChangePassword, new_password_confirmation: e.target.value })} />
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default withNamespaces()(Profile);
