import axios from 'axios';

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
    })
    .then((r) => r.data);
}

function getDetail(id: string) {
  return axios
    .get<IUserWithDetails>(process.env.api + '/users/' + id)
    .then((r) => r.data);
}

export const userApi = {
  search,
  getDetail,
};
