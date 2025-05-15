export function getUrlApi(url: string) {
  return `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;
}

export function getHeaders() {
  return {
    "Content-Type": "application/json",
  } as any;
}

export function getCsrfToken() {
  return fetch(getUrlApi(`/api/csrf-token`), {
    method: "GET",
    headers: {
      ...getHeaders(),
    },
    credentials: "include",
    cache: "no-cache",
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(
          `Erreur lors de la récupération du token CSRF: ${res.status}`
        );
      }
      const data = await res.json();
      return {
        "x-csrf-token": data.csrfToken,
      };
    })
    .catch((error) => {
      console.error("Erreur CSRF:", error);
      return null;
    });
}
