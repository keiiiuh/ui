/* eslint-disable operator-linebreak */
export const RgxUnicode = /^[\u0400-\u04FF\u00CB\u00EB -]+$/ // Диапазон символов Unicode, включающий кириллические символы.*
export const RgxCheckForHyphen = /^(?:[^-]+(?:-[^-]+){0,4}|[^-]+)$/ // Проверяет количество дефисов a-b-c-d-e Валидный (до 4 дефисов), не валидный*
export const RgxPatronymic =
  /^[a-zA-Zа-яА-ЯёЁ]+(?:\s*-\s*[a-zA-Zа-яА-ЯёЁ]+){0,4}(?:\s+[a-zA-Zа-яА-ЯёЁ]+(?:\s*-\s*[a-zA-Zа-яА-ЯёЁ]+){0,4})?$/i
