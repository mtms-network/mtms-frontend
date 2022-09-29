import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import moment from "moment";
import {
  BrandLogoLoading,
  Button,
  Collapser,
  GroupLayout,
  GroupTitle,
  IconButton,
  Pagination,
  Sorting
} from "components";
import {useNavigate} from "react-router-dom";
import {Dropdown, Menu, message, Popover} from 'antd';
import {deleteToDo, getListToDo, postStatusTodo} from "../../../../services";
import Status from "../../components/Status";
import TodoFilter from "../../components/TodoFilter";
import {MainLayout} from "../../../../components";
import {routeUrls} from "../../../../configs";
import DeleteToDo from "../../components/DeleteToDo";
import {handleHttpError} from "../../../../helpers";

const initialFilter = {
  limit: 10,
  page: 1,
  status: "",
  sort_by: "updated_at",
  order: "desc",
  keyword: "",
}

const ToDoList = ({t}) => {
  const deleteTodoModalRef = useRef(null);
  const navigate = useNavigate();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({...initialFilter});
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todoList, setToDoList] = useState([]);
  const [isReload, setIsReload] = useState(false);

  const fetchData = async () => {
    const res = await getListToDo(filter);
    await setToDoList(
      Array.isArray(res?.data) ? res?.data : []
    );
    await setPagination(res?.meta);
    await setIsReload(false);
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  useEffect(() => {
    if(isReload){
      fetchData().then();
    }
  }, [isReload]);

  const updateStatus = async (todo) => {
    await setLoading(true)
    try {
      const res = await postStatusTodo(todo.uuid);
      if (res.data.status === "success") {
        message.success(res.data.message);
        await setIsReload(true);
      } else {
        message.success(`Todo update status failed`);
      }
    } catch (error) {
      const errorData = handleHttpError(error);
      message.error(errorData.messageDetail ?? error.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500)
  };

  const menu = (todo) => (
    <Menu
      items={[
        // { key: '1', label: 'View to do' },
        // { key: '2', label: 'Edit to do' },
        {
          key: '3',
          label: (
            <div onClick={() => { deleteTodoModalRef.current?.show(todo); }}>
              Delete to do
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
                  <GroupTitle title={t('todo.todo_list')} className="!pb-0" />
                </div>
                <div className="space-x-2 py-2 flex flex-row w-auto items-center justify-end">
                  <div>
                    <Button
                      className="btn btn-primary btn-sm mr-2"
                      isLoading={loading}
                      onClick={() => {
                        navigate(`/${routeUrls.newTodo.path}`);
                      }}
                    >
                      {t("todo.add_new")}
                    </Button>
                  </div>
                  <div className="tooltip" data-tip={t("general.filter")}>
                    <IconButton
                      onClick={ async () => {
                        await setIsShowFilter(!isShowFilter);
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
                title={t("todo.to_do_filter")}
                content={
                  <TodoFilter
                    onChange={ async (f) => {
                      await setFilter({ ...filter, ...f });
                      await setIsReload(true);

                    }}
                    onClear={ async () => {
                      await setFilter({...initialFilter});
                      await setIsReload(true);
                    }}
                  />
                }
              />
            </div>
            <div className="flex w-full flex-1">
              <div className="overflow-x-auto flex-1 rounded-lg">
                {loading && <BrandLogoLoading />}
                {!loading && (
                  <table className="table w-full">
                    <thead className="border-b-1">
                    <tr className="text-cl-base">
                      <th className="bg-white truncate">{t('todo.task')}</th>
                      <th className="bg-white">{t("todo.due_date")}</th>
                      <th className="bg-white">{t("todo.status")}</th>
                      <th className="bg-white">{t("todo.completed_date")}</th>
                      <th className="bg-white flex justify-end" />
                    </tr>
                    </thead>
                    <tbody>
                    {
                      todoList?.map((todo, index) => {
                        return (
                          <tr key={index}>
                            <td className="bg-white truncate" title={todo?.description}>
                              <Popover content={todo?.description} trigger="hover">
                                <div className="max-w-[15rem] truncate">
                                  { todo?.title }
                                </div>
                              </Popover>
                            </td>
                            <td className="bg-white">{ moment(todo?.date).format("DD-MM-YYYY") }</td>
                            <td
                              className="bg-white"
                              onClick={() => {
                                updateStatus(todo).then();
                              }}
                            >
                              <Status status={todo?.status} />
                            </td>
                            <td className="bg-white">
                              { todo?.completed_at ? moment(todo?.completed_at).format("MMM, DD YYYY HH:mm") : "_" }
                            </td>
                            <td className="bg-white flex justify-end">
                              <Dropdown overlay={menu(todo)} placement="bottomRight" arrow>
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
                    total={pagination?.total}
                    limit={pagination?.per_page}
                    from={pagination?.from}
                    to={pagination?.to}
                    onNext={() => {
                      if (filter.page < pagination?.last_page) {
                        const nextPage = filter.page + 1;
                        setFilter({ ...filter, page: nextPage });
                      }
                    }}
                    onBack={() => {
                      if (filter.page <= pagination?.last_page && filter.page > 1) {
                        const nextPage = filter.page - 1;
                        setFilter({ ...filter, page: nextPage });
                      }
                    }}
                    onPage={(page) => {
                      if (page !== pagination?.current_page) {
                        setFilter({ ...filter, page });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </GroupLayout>
        </div>
      </div>
      <DeleteToDo
        onRefresh={setIsReload}
        ref={deleteTodoModalRef}
      />
    </MainLayout>

  );
};

export default withTranslation()(ToDoList);
