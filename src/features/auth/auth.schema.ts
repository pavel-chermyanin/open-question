import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Логин обязателен"),
  password: yup.string().required("Пароль обязателен"), // Add the password field
});
