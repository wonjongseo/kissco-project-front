import axios from "axios";
const BASE_URL = "https://kissco-dic.herokuapp.com";
// export const BASE_URL = "http://localhost:8080";

export const printLog = (url: string, method: string, name: string) => {
  // console.log(`${method.toUpperCase()}  : ${url} :: ${name}`);
};
export const searchWord = async (source: string, word: string) => {
  const new_url = `${BASE_URL}/api/vocas`;

  // printLog(new_url, "GET", "searchWord");

  const response = await axios.get(new_url, {
    params: {
      source,
      word,
    },
  });

  // console.log("returnd: ", response.data);

  return response.data;
};

export const getCountWord = async (userId: number) => {
  const new_url = `${BASE_URL}/api/users/vocas/cnt/${userId}`;

  // printLog(new_url, "get", "getCount");

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
  // printLog(new_url, "GET", "getWords");
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

  // console.log("returned : ", response.data);
  return response.data;
};

export const addVoca = async (
  userId: number,
  word: string,
  mean: string,
  source: string
) => {
  const new_url = `${BASE_URL}/api/vocas/${userId}`;

  // printLog(new_url, "POST", "addVoca");
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

  // printLog(new_url, "POST", "addCustomVoca");

  await axios.post(new_url, {
    word,
    mean,
    source: "ko",
  });
};
export const deleteVoca = async (vocaId: number, userId: number) => {
  const new_url = `${BASE_URL}/api/vocas/${vocaId}/${userId}`;

  // printLog(new_url, "DELETE", "deleteVoca");
  const response = await axios.delete(new_url);

  return response.data;
};

export const changeIsKnown = async (vocaId: number, isKnown: boolean) => {
  const new_url = `${BASE_URL}/api/users/vocas/${vocaId}/1?isKnown=${isKnown}`;
  // printLog(new_url, "post", "changeIsKnown");
  const response = await axios.post(new_url);

  return response.data;
};
