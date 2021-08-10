import basePath from './basePath';

async function post(endpoint: string, token: string, data: any) {
  const response = await fetch(`${basePath}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resJson = response.json();
  console.log(resJson);
  return resJson;
}

export default post;
