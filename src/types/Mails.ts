import { DeleteOutlined, ExclamationCircleOutlined, FileOutlined, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { includes } from 'lodash';

export interface IMail {
  id: number;
  from: string;
  title: string;
  text: string;
  date: number;
  isRead: boolean;
  filter: MailFilter;
  groupId: number | null;
}


export const mailFilters = ["incoming", "sent", "drafts", "deleted", "spam"] as const;

export const isMailFilter = (data: string): data is MailFilter => includes(mailFilters, data);

export type MailFilter = typeof mailFilters[number];

export const mailFilterAlias: Record<MailFilter, string> = {
  incoming: "Входящие",
  sent: "Отправленные",
  drafts: "Черновики",
  deleted: "Удаленные",
  spam: "Спам",
};

export const mailFilterIcons: Record<MailFilter, React.ForwardRefExoticComponent<any>> = {
  incoming: InboxOutlined,
  sent: SendOutlined,
  drafts: FileOutlined,
  deleted: DeleteOutlined,
  spam: ExclamationCircleOutlined,
};

export interface IGetMailsProps {
  filter?: MailFilter;
  groupId?: number;
  q: string;
}

export interface IUpdateMailProps {
  id: number;
  mail: Partial<Omit<IMail, 'id'>>;
}