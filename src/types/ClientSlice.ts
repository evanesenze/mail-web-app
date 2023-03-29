import { IMail, MailFilter } from "./Mails";

export interface IClientSliceState {
  query: string;
  selectedMailIds: number[];
  filter?: MailFilter;
  groupId?: number;
  currentMail?: IMail;
}