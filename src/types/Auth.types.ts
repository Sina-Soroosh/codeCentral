import { User } from "./Users.types";

type IsLogin = {
  isLogin: true;
  isAdmin: boolean;
  user: User;
  token?: string;
};

type IsUnauthorize = {
  isLogin: false;
};

export type Auth = IsLogin | IsUnauthorize;
