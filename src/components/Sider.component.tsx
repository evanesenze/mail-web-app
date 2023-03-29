import { FolderFilled, PlusOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Layout, Button, Menu, Typography, Row } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import useModal from "hooks/useModal";
import { useAppSearchParams } from "hooks/useAppSearchParams";
import React from "react";
import { useGetGroupsQuery } from "store/api/group.api";
import { useSendMailMutation } from "store/api/mail.api";
import { mailFilterAlias, mailFilterIcons, mailFilters } from "types/Mails";
import CreateGroupModal from "./Modals/CreateGroup.modal";

const { Sider, Header } = Layout;

const { Text, Title } = Typography;

const mainItems: ItemType[] = mailFilters.map((key) => ({
  key,
  label: mailFilterAlias[key],
  icon: React.createElement(mailFilterIcons[key]),
}));

const SiderComponent: React.FC = () => {
  const [sendMail] = useSendMailMutation();
  const { data: groups } = useGetGroupsQuery();
  const [openModal, createGroupModal] = useModal(CreateGroupModal, {
    key: "createGroupModal",
  });
  const { filter, groupId, onChangeFilter, onChangeGroup } =
    useAppSearchParams();

  const onSendMail = () => {
    sendMail({
      from: faker.internet.email(),
      title: faker.lorem.sentences(1),
      text: faker.lorem.sentences(),
      date: +faker.date.past(),
      isRead: false,
      filter: "incoming",
      groupId: null,
    }).unwrap();
  };

  return (
    <Sider>
      <Header>
        <Row align="middle" justify="center" style={{ height: "100%" }}>
          <Title className="header_logo">Mails</Title>
        </Row>
      </Header>
      <Row style={{ marginTop: "1rem" }} justify="center">
        <Button onClick={onSendMail}>Добавить письмо</Button>
      </Row>
      <Menu
        style={{ margin: "2rem 0" }}
        theme="dark"
        selectedKeys={[filter]}
        onSelect={({ key }) => onChangeFilter(key)}
        items={mainItems}
      />
      <Row justify="space-around" align="middle">
        <Text style={{ color: "white" }}>Группы</Text>
        <Button onClick={() => openModal()} icon={<PlusOutlined />} />
      </Row>
      <Menu
        theme="dark"
        selectedKeys={groupId ? [groupId] : undefined}
        onSelect={({ key }) => onChangeGroup(key)}
        items={groups?.map(({ color, id, title }) => ({
          key: id,
          label: title,
          icon: <FolderFilled style={{ color }} />,
        }))}
      />
      {createGroupModal}
    </Sider>
  );
};

export default SiderComponent;
