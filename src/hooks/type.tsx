export interface ICategory {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  slug: string;
  image: string;
}
export interface ICountry {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  slug: string;
}
export enum ERole {
  admin = "ADMIN",
  user = "USER",
}
export interface IUser {
  id: number;
  updatedAt?: string;
  createdAt?: string;
  fullName: string;
  phone: string;
  email: string;
  username: string;
  confirmed: boolean;
  role: ERole;
  imageURL?: string;
}
export interface IVideo {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  slug: string;
  duration: string;
  description: string;
  tag: string;
  deleted: boolean;
  release: string;
  vip: boolean;
  privacy: string;
  image: string;
  src: string;
  category: ICategory;
  country: ICountry;
  uploader: IUser;
}
export enum EPrivacy {
  public = "PUBLIC",
  private = "PRIVATE",
}
export interface IPlaylist {
  id: number;
  name: string;
  image: string;
  privacy: EPrivacy;
}
