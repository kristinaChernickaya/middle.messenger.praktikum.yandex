/* service HTTPTransport */
export type HTTPMethodType = (url: string, options?: any) => Promise<unknown>;
export type HTTPCurrentMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RequestOptions = {
  method?: HTTPCurrentMethodType;
  data?: any;
  headers?: { [key: string]: string };
  timeout?: number;
};

/* general */
export type EventType = {
  [key: string]: (event: Event) => void;
};

export type TAttr = {
  [key: string]: string;
};

export type TProps = Record<string, string | Function | unknown>;

export type TBlockProps = TProps & {
  events?: EventType;
  className?: string;
  withInternalId?: boolean;
  attr?: Record<string, string | boolean>;
};

export type TEvent = {
  [key: string]: (event: Event) => void;
};

export type TObjectKeys = {
  <T, K extends keyof T>(obj: T, key: K): T[K];
};

export type TButton = {
  text: string;
  type: string;
  className?: string;
};
// export type TProps<T> = Record<string, T>;
