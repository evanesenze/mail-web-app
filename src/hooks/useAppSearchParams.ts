import { useEffect } from "react";
import { useSearchParams as useSP } from "react-router-dom";
import { isMailFilter, MailFilter } from "types/Mails";
import { useAppActions } from "./useApp";

export const useAppSearchParams = () => {
  const [searchParams, setSearchParams] = useSP();
  const { setFilter, setGroupId } = useAppActions();
  const filter = searchParams.get("filter") as MailFilter;
  const groupId = searchParams.get("groupId");

  const onChangeFilter = (data?: string) => {
    const filter: MailFilter = data && isMailFilter(data) ? data : "incoming";
    setFilter(filter);
    setGroupId(undefined);
    setSearchParams({ filter });
  };

  const onChangeGroup = (groupId?: string) => {
    if (!groupId) return onChangeFilter();
    setGroupId(Number(groupId));
    setFilter(undefined);
    setSearchParams({ groupId });
  };

  useEffect(() => {
    if (!filter) onChangeFilter();
  }, []);

  return { filter, groupId, onChangeFilter, onChangeGroup }
};