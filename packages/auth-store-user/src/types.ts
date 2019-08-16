export type UserData = {
  [key: string]: unknown;
};

export type UserState = Readonly<{
  userData: UserData;
}>;
