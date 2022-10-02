import axios from "axios";
// export const BASE_URL = "https://kissco-dic.herokuapp.com";
export const BASE_URL = "http://localhost:8080";

export const searchWord = async (source: string, word: string) => {
  const new_url = `${BASE_URL}/api/vocas`;

  const response = await axios.get(new_url, {
    params: {
      source,
      word,
    },
  });

  return response.data;
};

export const getCountWord = async (userId: number, isKnown: boolean) => {
  const new_url = `${BASE_URL}/api/users/vocas/cnt/${userId}`;

  const response = await axios.get(new_url, {
    params: {
      isKnown: false,
    },
  });
  return response.data;
};

export const getWords = async (
  userId: number,
  page: number,
  isKnown: string,
  sort: string
) => {
  const new_url = `${BASE_URL}/api/users/vocas/${userId}`;

  let params = {} as any;

  if (isKnown === "all") {
    params["page"] = page;
    params["sort"] = sort;
  } else {
    params["page"] = page;
    params["sort"] = sort;
    params["isKnown"] = isKnown;
  }
  const response = await axios.get(new_url, {
    params,
  });

  return response.data;
};

export const addVoca = async (
  userId: number,
  word: string,
  mean: string,
  source: string
) => {
  const new_url = `${BASE_URL}/api/vocas/${userId}`;

  const res = await axios.post(new_url, {
    word,
    mean,
    source,
  });

  return res.data;
};

export const addCustomVoca = async (
  userId: number,
  word: string,
  mean: string
) => {
  const new_url = `${BASE_URL}/api/vocas/my/${userId}`;

  await axios.post(new_url, {
    word,
    mean,
    source: "ko",
  });
};
export const deleteVoca = async (vocaId: number, userId: number) => {
  const new_url = `${BASE_URL}/api/vocas/${vocaId}/${userId}`;

  const response = await axios.delete(new_url);

  return response.data;
};

export const changeIsKnown = async (
  vocaId: number,
  userId: number,
  isKnown: boolean
) => {
  const new_url = `${BASE_URL}/api/users/vocas/${vocaId}/${userId}?isKnown=${isKnown}`;
  const response = await axios.post(new_url);

  return response.data;
};
