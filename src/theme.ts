import { windowWidthVar } from "./atoms";
import { useRecoilValue } from "recoil";
import { DefaultTheme } from "styled-components";

export const moreThen1000: DefaultTheme = {
  sidebar: "20vw",
  text_size: "38px",
  title_size: "50px",
  title_font_weight: "700",
  button_font_size: "15px",
  button_padding: "8px 16px;",

  select_padding: "7px 14px",
  select_font_size: "15px",

  input_padding: "8px 70px 8px 5px",

  input_font_size: "18px",

  test_font_size: "150px",
  test_title_font_size: "50px",
  test_continue_font_size: "20px",
};

export const lessThen1000: DefaultTheme = {
  sidebar: "0",
  text_size: "19px",
  title_size: "20px",
  title_font_weight: "600",

  //button
  button_font_size: "13px",
  button_padding: "6px 18px",

  //select
  select_padding: "5px 10px",
  select_font_size: "13px",

  //input

  input_padding: "6px 50px 6px 5px",
  input_font_size: "13px",

  test_font_size: "100px",
  test_title_font_size: "20px",
  test_continue_font_size: "13px",
};
