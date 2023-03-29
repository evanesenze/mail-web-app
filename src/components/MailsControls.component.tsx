import { Button, Dropdown, Row, Space } from "antd";
import { useAppSelector } from "hooks/useApp";
import useModal from "hooks/useModal";
import { useSelectedMails } from "hooks/useSelectedMails";
import React, { useMemo } from "react";
import { useGetGroupsQuery } from "store/api/group.api";
import { MailFilter, mailFilterAlias, mailFilters } from "types/Mails";
import CreateGroupModal from "./Modals/CreateGroup.modal";

const deletePermanently: MailFilter[] = ["deleted", "spam"];

const MailsControlsComponent: React.FC = () => {
  const { moveTo, deleteSelected, isEmpty, isLoading, readSelected } =
    useSelectedMails();
  const filter = useAppSelector((store) => store.client.filter);
  const { data: groups } = useGetGroupsQuery();
  const groupId = useAppSelector((store) => store.client.groupId);
  const [openModal, editGroupModal] = useModal(CreateGroupModal, {
    key: "editGroupModal",
  });
  const group = useMemo(
    () => groups?.find((item) => item.id === groupId),
    [groups, groupId]
  );
  const isDeletePermanently = filter && deletePermanently.includes(filter);

  return (
    <Row className="mails_controls">
      <Space>
        <Button
          type="primary"
          onClick={readSelected}
          loading={isLoading}
          disabled={isEmpty || isLoading}
        >
          Прочитать
        </Button>
        <Dropdown
          disabled={isEmpty || isLoading}
          trigger={["click"]}
          placement="bottomLeft"
          menu={{
            items: mailFilters
              .filter((item) => item !== filter)
              .map((key) => ({
                key,
                label: mailFilterAlias[key],
              })),
            onClick: ({ key }) => moveTo(key as MailFilter),
          }}
        >
          <Button loading={isLoading}>Переместить в</Button>
        </Dropdown>
        {isDeletePermanently && (
          <Button
            danger
            onClick={deleteSelected}
            loading={isLoading}
            disabled={isEmpty || isLoading}
          >
            Удалить
          </Button>
        )}
        {!!group && (
          <>
            <Button onClick={() => openModal({ key: "editGroupModal", group })}>
              Редактировать группу
            </Button>
          </>
        )}
      </Space>
      {editGroupModal}
    </Row>
  );
};

export default MailsControlsComponent;
