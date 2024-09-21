export type EventType = {
  [key: string]: (event: Event) => void;
};

export type TButtonProps = TBlockProps & {
  text: string;
};

export type TObjectKeys = {
  <T, K extends keyof T>(obj: T, key: K): T[K];
};

export type TProps = Record<string, string | Function | unknown>;

export type TBlockProps = TProps & {
  events?: EventType;
  className?: string;
  attr?: { withInternalID: boolean } & Record<string, string | boolean>;
};
