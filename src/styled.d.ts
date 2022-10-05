import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    word_size: string;
    sidebar: string;
    text_size: string;
    title_size: string;
    title_font_weight: string;
    button_padding: string;
    button_font_size: string;

    select_padding: string;
    select_font_size: string;

    input_padding: string;
    input_font_size: string;

    test_font_size: string;
    test_title_font_size: string;
    test_continue_font_size: string;
    // bgColor: string;
    // accentColor: string;
  }
}
