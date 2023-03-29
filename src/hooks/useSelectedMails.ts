import { useAppSelector, useAppActions } from './useApp';
import { mailFilterAlias } from 'types/Mails';
import { MailFilter } from 'types/Mails';
import { message } from "antd";
import { useDeleteMailMutation, useUpdateMailMutation } from "store/api/mail.api";

const resetGroup: MailFilter[] = ['spam', 'deleted'];

export const useSelectedMails = () => {
  const [deleteMail, { isLoading: isDeletingMail }] = useDeleteMailMutation();
  const [updateMail, { isLoading: isUpdatingMail }] = useUpdateMailMutation();
  const selected = useAppSelector(store => store.client.selectedMailIds);
  const { setSelectedMails } = useAppActions();

  const deleteSelected = async () => {
    await Promise.all(selected.map((id) => deleteMail(id).unwrap()))
      .then(() => {
        message.success("Письма успешно удалены");
        setSelectedMails([]);
      })
      .catch(() => message.error("Ошибка при удалении сообщений"));
  };

  const readSelected = async () => {
    await Promise.all(
      selected.map((id) =>
        updateMail({ id, mail: { isRead: true } }).unwrap()
      )
    ).then(() => {
      message.success('Письма прочитаны');
      setSelectedMails([]);
    })
      .catch(() => message.error("Ошибка при прочтении сообщений"));
  };

  const moveTo = async (filter: MailFilter) => {
    const isResetGroup = resetGroup.includes(filter);
    await Promise.all(selected.map((id) =>
      updateMail({ id, mail: { filter, groupId: isResetGroup ? null : undefined } }).unwrap()
    ))
      .then(() => {
        message.success(`Письма перенесены в раздел "${mailFilterAlias[filter]}"`);
        setSelectedMails([]);
      })
      .catch(() => message.error("Ошибка при переносе сообщений"));
  };

  return { selected, setSelectedMails, deleteSelected, readSelected, moveTo, isLoading: isDeletingMail || isUpdatingMail, isEmpty: !selected.length }
}

