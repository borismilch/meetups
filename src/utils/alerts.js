export default {
  noUser: { type: "error", text: "Autorize before exploring the page" },
  PERMISSION_DENIED: {
    type: "error",
    text: "Користувача під вашою адресою не існує",
  },
  USER_NOT_FOUND: {
    type: "error",
    text: "Ви не авторизовані, у вас немає прав",
  },
  USER_SIGNED_IN: { type: "success", text: "ви успівно авторизувалися" },
  USER_REGISTERED: { type: "success", text: "ви успівно зареєструвалися" },
  USER_SIGN_OUT: { type: "success", text: "ви успівно вийшли із системи" },
  USER_SUBSCRIBED: { type: "success", text: "Ви підписалися на зустріч" },
  USER_UNSUBED: {
    type: "info",
    text: "Ви відписались від участі в цій зустрічі",
  },
  MEETUP_CREATED: { type: "success", text: "Ви успішно створили мітап" },
  INCORRECT_DATA: {
    type: "error",
    text: "Вине ввели необхідні дані, роззуйте очі",
  },
  MEETUP_DELETED: { type: "info", text: "Ви успішно видалили мітап" },
  MEETUP_UPDATED: { type: "success", text: "мітап Відредаговано" }
};
