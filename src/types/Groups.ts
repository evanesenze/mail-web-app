export interface IGroup {
  id: number;
  title: string;
  color: string;
}

export interface IUpdateGroupProps {
  id: number;
  group: Partial<Omit<IGroup, 'id'>>;
}
