const BASE_URL = 'http://localhost:8080';

const commonHeaders = {
  'Content-Type': 'application/json;charset=utf-8',
};

export const callApiEndpoint = async ({
  endpoint, method, body, headers,
}) => {
  console.log('endpoint: ', endpoint);
  console.log('method: ', method);
  console.log('body: ', body);
  console.log('headers: ', headers);

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { ...commonHeaders, ...headers },
    });

    if (!response.ok) {
      return {
        success: false,
        error: new Error(response.statusText),
      };
    }

    const responseJson = await response.json();
    return {
      success: true,
      response: responseJson,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const fetchAllGoodsApi = () => (
  callApiEndpoint({
    endpoint: 'goods',
    method: 'GET',
  }));

export const addGoodsApi = ({ item }) => (
  callApiEndpoint({
    endpoint: 'goods',
    method: 'POST',
    body: item,
  }));

export const removeGoodsApi = ({ id }) => (
  callApiEndpoint({
    endpoint: `goods/${id}`,
    method: 'DELETE',
  }));

export const updateGoodsApi = ({ item }) => (
  callApiEndpoint({
    endpoint: `goods/${item.id}`,
    method: 'PUT',
    body: item,
  }));
