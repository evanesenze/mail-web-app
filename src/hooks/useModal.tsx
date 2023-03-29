import { ModalProps } from "antd";
import React from "react";
import { useState } from "react";

export type CommonModalProps<
  P extends CommonComponentProps = CommonComponentProps,
  T = unknown
> = ModalProps & { onSubmit(data: T): void; props: P };

export type CommonComponentProps = {
  key: React.Key;
  onSubmit?: (data: any) => void;
};

function useModal<P extends CommonComponentProps, T>(
  Component: React.FC<CommonModalProps<P, T>>,
  props: P
): [(props?: P) => void, JSX.Element, T | undefined] {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState<T>();
  const [extraProps, setExtraProps] = useState<Partial<P>>();

  const open = (props?: Partial<P>) => {
    if (props) setExtraProps(props);
    setOpened(true);
  };

  const onCancel = () => {
    extraProps?.onSubmit?.(null);
    setExtraProps(undefined);
    setOpened(false);
  };

  const onSubmit = (data: T) => {
    setData(data);
    props.onSubmit?.(data);
  };

  return [
    open,
    <Component
      key={props.key}
      props={{ ...props, ...extraProps }}
      open={opened}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />,
    data,
  ];
}

export default useModal;
