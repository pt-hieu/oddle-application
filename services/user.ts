import axios from 'axios';

import { IRepository } from '@/models/repository';
import { IUser, IUserWithDetails } from '@/models/user';

export type TSearchParams = Partial<{
  q: string;
  sort: 'followers' | 'repositories' | 'joined';
  order: 'desc' | 'asc';
  per_page: number;
  page: number;
}>;

export type TSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: IUser[];
};

function search(params: TSearchParams) {
  return axios
    .get<TSearchResponse>(process.env.api + '/search/users', {
      params,
      headers: {
        authorization: process.env.gh_token!,
      },
    })
    .then((r) => r.data);
}

function getDetail(login: string) {
  return axios
    .get<IUserWithDetails>(process.env.api + '/users/' + login)
    .then((r) => r.data);
}

function getRepos(login: string) {
  return axios
    .get<IRepository[]>(`${process.env.api}/users/${login}/repos`)
    .then((r) => r.data);
}

export const userApi = {
  search,
  getDetail,
  getRepos,
};
