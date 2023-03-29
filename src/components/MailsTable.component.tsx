import "dayjs/locale/ru";
import { Row, Table, message, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAppActions, useAppSelector } from "hooks/useApp";
import React from "react";
import { useGetMailsQuery, useUpdateMailMutation } from "store/api/mail.api";
import { IMail, MailFilter } from "types/Mails";
import cn from "classnames";
import { useSelectedMails } from "hooks/useSelectedMails";
import { FolderAddOutlined, FolderFilled } from "@ant-design/icons";
import { useGetGroupsQuery } from "store/api/group.api";
import MailsControlsComponent from "./MailsControls.component";
import { IGroup } from "types/Groups";
dayjs.locale("ru");

const getColumns = (
  updateGroup: UpdateGroupMailFc,
  hideGroupsColumn: boolean,
  groups: IGroup[] = []
): ColumnsType<IMail> => {
  const res: ColumnsType<IMail> = [
    {
      title: "Автор",
      key: "from",
      dataIndex: "from",
      width: 250,
      render: (value) => <span className="message_from">{value}</span>,
    },
    {
      title: "Сообщение",
      key: "message",
      render: (_, data) => (
        <div className="message_text__container">
          <span className="message_text__title">{data.title}</span> -{" "}
          <span>{data.text}</span>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Дата",
      key: "date",
      dataIndex: "date",
      render: (value: number) => (
        <span className="message_date">{dayjs(value).format("DD MMM")}</span>
      ),
      width: 100,
      sorter: { compare: (a, b) => b.date - a.date },
      defaultSortOrder: "descend",
    },
  ];

  if (!hideGroupsColumn && groups.length)
    res.unshift({
      title: "",
      key: "group",
      width: 30,
      render: (_, mail) => {
        const hasGroup = !!mail.groupId;
        const color = groups.find((item) => item.id === mail.groupId)?.color;
        return (
          <Row
            justify="center"
            align="middle"
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown
              trigger={["click"]}
              menu={{
                items: groups.map(({ id, title }) => ({
                  key: id,
                  label: title,
                })),
                onClick: ({ key }) => updateGroup(mail, Number(key)),
                activeKey: hasGroup ? String(mail.groupId) : undefined,
              }}
              placement="bottomLeft"
            >
              {hasGroup ? (
                <FolderFilled style={{ color }} />
              ) : (
                <FolderAddOutlined />
              )}
            </Dropdown>
          </Row>
        );
      },
    });

  return res;
};

type UpdateGroupMailFc = (mail: IMail, groupId: number) => Promise<void>;

const hideGroups: MailFilter[] = ["deleted", "spam"];

const MailsTable: React.FC = () => {
  const { filter, query, groupId } = useAppSelector((store) => store.client);
  const { setCurrentMail } = useAppActions();
  const { data: mails } = useGetMailsQuery({ q: query, filter, groupId });
  const { data: groups } = useGetGroupsQuery();
  const { selected, setSelectedMails } = useSelectedMails();
  const [updateMail] = useUpdateMailMutation();

  const updateGroupMail: UpdateGroupMailFc = async (mail, groupId) => {
    const isGroupExist = mail.groupId === groupId;
    await updateMail({
      id: mail.id,
      mail: { groupId: isGroupExist ? null : groupId },
    })
      .unwrap()
      .then(() => {
        message.success(
          isGroupExist
            ? "Письмо удалено из группы"
            : "Письмо добавлено в группу"
        );
      })
      .catch(() => {
        message.error("Ошибка при обновлении письма");
      });
  };

  return (
    <div className="content_wrapper mails_list__container">
      <MailsControlsComponent />
      <Table
        size="small"
        pagination={{ pageSize: 50 }}
        onRow={(item) => ({
          className: cn({ mail_item__read: item.isRead }),
          onClick: () => setCurrentMail(item),
        })}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelectedMails(keys.map(Number)),
        }}
        columns={getColumns(
          updateGroupMail,
          !filter || hideGroups.includes(filter),
          groups
        )}
        dataSource={mails?.map((item) => ({ ...item, key: item.id }))}
      />
    </div>
  );
};

export default MailsTable;
