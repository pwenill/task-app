import { ResponseRequest, Task } from "./interfaces";
import { getCsrfToken, getHeaders, getUrlApi } from "./utils";

export async function api_ManageTask(data: any) {
  const csrf = await getCsrfToken();

  const url = data.id ? `/${data.id}/update` : "/create-task";

  return fetch(getUrlApi(`/api${url}`), {
    method: "POST",
    headers: {
      ...getHeaders(),
      ...csrf,
    },
    body: JSON.stringify(data),
    cache: "no-cache",
  })
    .then(async (res) => {
      return { status: res.status, data: await res.json() } as ResponseRequest;
    })
    .catch((error) => {
      throw error;
    });
}

export async function api_Tasks() {
  return fetch(getUrlApi(`/api/tasks`), {
    method: "GET",
    headers: {
      ...getHeaders(),
    },
    cache: "no-cache",
  })
    .then(async (res) => {
      return {
        status: res.status,
        data: await res.json(),
      } as ResponseRequest & {
        data: {
          lists: Task[];
        };
      };
    })
    .catch((error) => {
      throw error;
    });
}

export async function api_DeleteTask(id: string) {
  const csrf = await getCsrfToken();

  return fetch(getUrlApi(`/api/${id}/delete`), {
    method: "POST",
    headers: {
      ...getHeaders(),
      ...csrf,
    },
    cache: "no-cache",
  })
    .then(async (res) => {
      return { status: res.status, data: await res.json() } as ResponseRequest;
    })
    .catch((error) => {
      throw error;
    });
}

export async function api_UpdateStatusTask(data: any) {
  const csrf = await getCsrfToken();

  return fetch(getUrlApi(`/api/${data.id}/update-status`), {
    method: "POST",
    headers: {
      ...getHeaders(),
      ...csrf,
    },
    body: JSON.stringify(data),
    cache: "no-cache",
  })
    .then(async (res) => {
      return { status: res.status, data: await res.json() } as ResponseRequest;
    })
    .catch((error) => {
      throw error;
    });
}
