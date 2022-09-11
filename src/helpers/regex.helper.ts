export const RegexHelper = {
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  DATE_OF_BIRTH: /[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/,
  POSTCODE: /^\d{5}-\d{3}$/,
};
