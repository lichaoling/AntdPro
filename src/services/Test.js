import request from '../utils/request';

export async function setMyWords(words) {
  // return request(`http://10.22.112.182:58157/User/setUsers?words=${words}`);
  return request(`http://10.22.112.182:58157/User/setUsers`, {
    method: 'POST',
    body: { words: words },
  });
}
