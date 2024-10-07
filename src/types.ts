/* service HTTPTransport */
export type HTTPMethodType = (url: string, options?: any) => Promise<unknown>;
export type HTTPCurrentMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RequestOptionsType = {
  method?: HTTPCurrentMethodType;
  data?: Document | XMLHttpRequestBodyInit | null | undefined;
  headers?: { [key: string]: string };
  timeout?: number;
};

/* general */
export type EventType = {
  [key: string]: (event: Event) => void;
};

export type PropsValueType = Node | string | number | [] | Function | unknown;

export type ObjectType = {
  [key: string]: string;
};

export type PropsListType = {
  [key: string]: Node[];
};
export type AttrEventsType = {
  events?: EventType;
  attr?: Record<string, string | boolean | number>;
};
export type TBlockProps = AttrEventsType & {
  className?: string;
  withInternalId?: boolean;
  currentPage?: string;
};

export type TObjectKeys = {
  <T, K extends keyof T>(obj: T, key: K): T[K];
};

export type PropsAttrType = Record<string, string | boolean | number | Function | unknown>;

/* components */
export type ButtonType = AttrEventsType & {
  text?: string;
  type?: string;
  className?: string;
  withInternalId?: boolean;
};

export type InputType = AttrEventsType & {
  text?: string;
  type: string;
  name: string;
  className?: string;
  placeholderText?: string;
};

export type InputBlockType = {
  input: string;
  label: string;
};

export type LinkType = AttrEventsType & {
  href: string;
  className?: string;
  text?: string;
};

export type ChatBlockType = AttrEventsType & {
  userName: string;
  userMessage: string;
  date: string;
  countMessage?: string;
};
export type TextareaType = AttrEventsType & {
  name: string;
  id?: string;
  className?: string;
  placeholderText?: string;
};

export type ChatFormType = {
  textarea: ObjectType;
  sentButton: ObjectType;
};
export type ChatLeftSideBarType = {
  linkProfile: ObjectType;
  searchInput: ObjectType;
  chatsBlock: ObjectType[];
};

export type TProps = Record<string, string | Function | unknown>;
