import axios from "axios";
export const BASE_URL = "https://kissco-dic.herokuapp.com";
// export const BASE_URL = "http://localhost:8080";

export const searchWord = async (word: string) => {
  const new_url = `${BASE_URL}/api/vocas`;

  const response = await axios.get(new_url, {
    params: {
      word,
    },
  });

  return response.data;
};

export const getCountWord = async (userId: number, isKnown: string) => {
  const new_url = `${BASE_URL}/api/users/vocas/cnt/${userId}`;

  if (isKnown === "all") {
    const response = await axios.get(new_url);

    const { count } = response.data;
    return count;
  } else {
    const response = await axios.get(new_url, {
      params: {
        isKnown,
      },
    });
    const { count } = response.data;

    return count;
  }
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

export const addVoca = async (userId: number, word: string, mean: string) => {
  const new_url = `${BASE_URL}/api/vocas/${userId}`;

  try {
    const res = await axios.post(new_url, {
      word,
      mean,
    });
    console.log(res);

    return res;
  } catch (error) {
    console.log("addVoca");

    throw error;
  }
};

export const addCustomVoca = async (
  userId: number,
  word: string,
  mean: string
) => {
  const new_url = `${BASE_URL}/api/vocas/my/${userId}`;

  const data = await axios.post(new_url, {
    word,
    mean,
    source: "ko",
  });
  console.log(data);
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

export const getTestVocas = async (userId: number, isKnown: string) => {
  const new_url = `${BASE_URL}/api/uses/vocas/test/${userId}`;
  var response;
  if (isKnown === "all") {
    response = await axios.get(new_url);
  } else {
    response = await axios.get(new_url, {
      params: { isKnown },
    });
  }

  console.log("test all");

  console.log(response.data);

  return response.data;
};
