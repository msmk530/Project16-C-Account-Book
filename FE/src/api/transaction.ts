import {
  getFetch,
  postFetch,
  updateFetch,
  deleteFetch,
} from '../service/fetch';

export const createTransaction = async (accountbookId, transaction) => {
  const url = `${process.env.SERVER_URL}/api/accountbook/${accountbookId}/transaction`;
  const res = await postFetch(url, transaction);

  return res;
};

export const updateTransaction = () => {};

export const deleteTransaction = () => {};
