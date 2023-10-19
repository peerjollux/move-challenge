async function validateReponse(res: Response) {
  if (!res.ok) {
    throw new Error(`Invalid response from the server, status '${res.status}'`);
  }

  return res;
}

export function getTags(): Promise<{ tags: string[] }> {
  return fetch("/api/tags")
    .then(validateReponse)
    .then((res) => res.json());
}
