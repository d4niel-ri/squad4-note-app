import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  users: '/users',
  notes: '/notes',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const pingDB = () => callAPI(urls.users, 'GET');
// eslint-disable-next-line object-shorthand
export const getNoteByID = (id) => callAPI(urls.notes, 'GET', {}, { id: id });
export const updateNote = (note) => callAPI(`${urls.notes}/${note.id}`, 'PUT', {}, {}, note);
export const deleteNote = (id) => callAPI(`${urls.notes}/${id}`, 'DELETE');
