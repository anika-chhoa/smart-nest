
const baseURL = process.env.NEXT_PUBLIC_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`);
  return res.json();
};

export const serverMutation = async (path, data, action = "POST") => {
  const res = await fetch(`${baseURL}${path}`, {
    method: action,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const serverDelete = async (path) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.json();
}