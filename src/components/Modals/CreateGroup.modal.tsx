import { Form, Modal, Input, Button, message } from "antd";
import { Rule } from "antd/es/form";
import { CommonComponentProps, CommonModalProps } from "hooks/useModal";
import { useEffect, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} from "store/api/group.api";
import { IGroup } from "types/Groups";

const requiredRule: Rule = {
  required: true,
  message: "Обязательное поле",
};

interface IFormData {
  title: string;
  color: ColorResult;
}

interface ICreateGroupModalProps extends CommonComponentProps {
  group?: IGroup;
}

const CreateGroupModal: React.FC<CommonModalProps<ICreateGroupModalProps>> = ({
  props,
  ...modalProps
}) => {
  const [form] = Form.useForm<IFormData>();
  const [color, setColor] = useState<string>();
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const isGroupExist = props.group;

  const onCreate = async ({ title }: IFormData) => {
    if (!color) return;
    await createGroup({ color, title })
      .unwrap()
      .then(() => {
        message.success(`Группа "${title}" создана`);
        onCancel({} as any);
      })
      .catch(() => message.error("Ошибка при создании группы"));
  };

  const onEdit = async ({ title }: IFormData) => {
    if (!color || !props.group) return;
    await updateGroup({ id: props.group.id, group: { color, title } })
      .unwrap()
      .then(() => {
        message.success(`Группа "${props.group?.title}" обновлена`);
        onCancel({} as any);
      })
      .catch(() => message.error("Ошибка при обновлении группы"));
  };

  const onDelete = async () => {
    if (!props.group) return;
    await deleteGroup(props.group.id)
      .unwrap()
      .then(() => {
        message.success(`Группа "${props.group?.title}" удалена`);
        onCancel({} as any);
      })
      .catch(() => message.error("Ошибка при удалении группы"));
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    form.resetFields();
    modalProps.onCancel?.(e);
  };

  useEffect(() => {
    form.setFields([{ name: "title", value: props.group?.title }]);
    setColor(props.group?.color);
  }, [props]);

  return (
    <Modal
      {...modalProps}
      title={`${isGroupExist ? "Редактирование" : "Добавление"} группы`}
      footer={<></>}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={isGroupExist ? onEdit : onCreate}
      >
        <Form.Item name="title" label="Название" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Цвет" rules={[requiredRule]}>
          <ChromePicker
            className="color_picker"
            color={color}
            onChange={(props) => setColor(props.hex)}
          />
        </Form.Item>
        <Form.Item style={{ marginTop: "2rem" }}>
          <Button block htmlType="submit">
            {isGroupExist ? "Изменить" : "Создать"}
          </Button>
        </Form.Item>
        {isGroupExist && (
          <Form.Item>
            <Button onClick={onDelete} danger block>
              Удалить
            </Button>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;
