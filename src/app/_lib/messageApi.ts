import http from "./axios";

export const getMessages = async ({
  sender,
  recipient,
  page,
}: {
  sender: string;
  recipient: string;
  page: number;
}) => {
  const response = await http.get(
    `/messages/${sender}/${recipient}?page=${page}`
  );

  return response.data;
};
