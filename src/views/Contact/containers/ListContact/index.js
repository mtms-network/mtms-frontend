import classNames from "classnames";
import React, {useEffect, useRef, useState} from "react";
import {withTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Avatar, Dropdown, Menu, Popover} from 'antd';
import {
  BrandLogoLoading, Button,
  Collapser,
  GroupLayout,
  GroupTitle,
  IconButton,
  MainLayout,
  Pagination
} from "../../../../components";
import ContactFilter from "../../components/ContactFilter";
import {routeUrls} from "../../../../configs";
import {getAllContact} from "../../../../services";
import DeleteContact from "../../components/DeleteContact";

const ListContact = ({t}) => {
  const navigate = useNavigate();
  const deleteContactModalRef = useRef(null);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    sort_by: "created_at",
    order: "desc",
    name: "",
    email: "",
  });
  const [sort, setSort] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isReload, setIsReload] = useState(true);
  const fetchData = async () => {
    const res = await getAllContact(filter);
    await setContacts(
      Array.isArray(res?.data) ? res?.data : []
    );
    await setPagination(res?.meta);
    await setIsReload(false);
  };

  useEffect(() => {
    if(isReload){
      fetchData().then();
    }
  }, [isReload]);

  const menu = (contact) => (
    <Menu
      items={[
        // { key: '1', label: 'View to do' },
        {
          key: '2',
          label: (
            <div onClick={() => { navigate(`/${routeUrls.contact.path}/${contact?.uuid}`) }}>
              Edit contact
            </div>
          )
        },
        {
          key: '3',
          label: (
            <div onClick={() => { deleteContactModalRef.current?.show(contact); }}>
              Delete contact
            </div>
          )
        },
      ]}
    />
  );

  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={classNames(["flex flex-col w-full"])}>
          <GroupLayout
            className="flex flex-col w-full"
            titleComponent={
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex-1">
                  <GroupTitle title={t("contact.title")} className="!pb-0" />
                </div>
                <div className="space-x-2 py-2 flex flex-row w-auto items-center justify-end">
                  <Button
                    className="btn btn-primary btn-sm mr-2"
                    isLoading={false}
                    onClick={() => {
                      navigate(`/${routeUrls.newContact.path}`);
                    }}
                  >
                    {t("todo.add_new")}
                  </Button>
                  <div className="tooltip" data-tip={t("general.filter")}>
                    <IconButton
                      onClick={() => {
                        setIsShowFilter(!isShowFilter);
                      }}
                      src="/icons/icons/filter-outline.svg"
                      alt="Filter"
                    />
                  </div>
                </div>
              </div>
            }
          >
            <div>
              <Collapser
                show={isShowFilter}
                title={t("contact.props.filter")}
                content={
                  <ContactFilter
                    onChange={ async (f) => {
                      await setFilter({ ...filter, ...f });
                      await setIsReload(true);
                    }}
                  />
                }
              />
            </div>
            <div className="flex w-full flex-1">
              <div className="overflow-x-auto flex-1 rounded-lg">
                {isReload && <BrandLogoLoading />}
                {!isReload && (
                  <table className="table w-full">
                    <thead className="border-b-1">
                    <tr className="text-cl-base">
                      <th className="bg-white truncate">Information</th>
                      <th className="bg-white" width={200}>Company</th>
                      <th className="bg-white" width={200}>Job</th>
                      <th className="bg-white" width={200}>Phone number</th>
                      <th className="bg-white flex justify-end">
                        <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        contacts?.map((contact, index) => {
                          return (
                            <tr key={index}>
                              <td className="bg-white">
                                <div className="flex">
                                  <Avatar size={40}>{ contact?.name?.charAt(0) }</Avatar>
                                  <Popover content={contact?.name} trigger="hover">
                                    <div className="truncate flex flex-col ml-2" style={{maxWidth: '15rem'}}>
                                      <div>{contact.name}</div>
                                      <div>{contact.email}</div>
                                    </div>
                                  </Popover>
                                </div>
                              </td>
                              <td className="bg-white">{ contact?.company }</td>
                              <td className="bg-white">{ contact?.position }</td>
                              <td className="bg-white">{ contact?.phone_number }</td>
                              <td className="bg-white flex justify-end">
                                <Dropdown overlay={menu(contact)} placement="bottomRight" arrow>
                                  <img className="cursor-pointer" src="/images/icon/more.svg" alt="" />
                                </Dropdown>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                )}
                <div className="py-8 flex justify-center">
                  <Pagination
                    page={pagination?.current_page}
                    totalPage={pagination?.last_page}
                    limit={pagination?.per_page}
                    onNext={ async () => {
                      if (filter.page < pagination?.last_page) {
                        const nextPage = filter.page + 1;
                        await setFilter({ ...filter, page: nextPage });
                        await setIsReload(true)
                      }
                    }}
                    onBack={ async () => {
                      if (filter.page <= pagination?.last_page && filter.page > 1) {
                        const nextPage = filter.page - 1;
                        await setFilter({ ...filter, page: nextPage });
                        await setIsReload(true)
                      }
                    }}
                    onPage={ async (page) => {
                      if (page !== pagination?.current_page) {
                        await setFilter({ ...filter, page });
                        await setIsReload(true)
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </GroupLayout>
        </div>
      </div>
      <DeleteContact
        onRefresh={setIsReload}
        ref={deleteContactModalRef}
      />
    </MainLayout>

  );
};

export default withTranslation()(ListContact);
