import { z } from 'zod'
import { MOCK_RADIO_GROUP } from './mockData'
import { EnumFieldType, type TStorybookFieldConfig } from './types'
import { VALIDATION_MESSAGES, zodCalendarValidate } from '$/shared/validation'

export const mockToastMessage = (values: string) => (
  <div className='flex flex-col'>
    <p className='desk-body-regular-l'>Форма успешно отправлена</p>
    <code className='desk-body-regular-m text-color-tetriary'>{values}</code>
  </div>
)

export const mockSchema = z.object({
  city: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }).min(3, `${VALIDATION_MESSAGES.MIN_LENGTH} 3`),
  phone: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }).min(7, `${VALIDATION_MESSAGES.MIN_LENGTH} 7`),
  condition: z.literal<boolean>(true, { errorMap: () => ({ message: VALIDATION_MESSAGES.REQUIRED }) }),
  sex: z.string().min(2, VALIDATION_MESSAGES.REQUIRED),
  percent: z.literal<boolean>(true, { errorMap: () => ({ message: VALIDATION_MESSAGES.REQUIRED }) }),
  months: z.string().or(z.array(z.string())),
  description: z.string().min(3, `${VALIDATION_MESSAGES.MIN_LENGTH} 3`),
  birthday: zodCalendarValidate,
  slider: z.number().or(z.string()),
  creditSum: z.number().or(z.string()),
  files: z
    .array(z.instanceof(File))
    .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
    .max(3, { message: 'Можно отправить не больше трех файлов. Чтобы добавить файлы удалите выбранные' }),
  html: z.string().min(1, { message: VALIDATION_MESSAGES.REQUIRED })
})

export type TMockSchema = z.infer<typeof mockSchema>
export const mockDefaultValues: TMockSchema = {
  city: '',
  phone: '',
  condition: true,
  sex: '',
  percent: true,
  months: '',
  description: '',
  birthday: '12.11.2024',
  slider: 100_000,
  creditSum: 100_000,
  files: [],
  html: ''
}

export const mockFields: TStorybookFieldConfig<TMockSchema>[] = [
  { name: 'city', label: 'Город', fieldType: EnumFieldType.INPUT },
  { name: 'phone', label: 'Номер телефона', fieldType: EnumFieldType.MASK, format: '# (###) ###-##-##' },
  {
    name: 'condition',
    label:
      'Выражаю согласие на обработку персональных данных и подтверждаю, что ознакомлен с Политикой обработки персональных данных',
    fieldType: EnumFieldType.CHECKBOX
  },
  {
    name: 'sex',
    groupName: 'Выберите пол',
    radioItemsGroup: MOCK_RADIO_GROUP,
    fieldType: EnumFieldType.RADIO
  },
  { name: 'percent', label: 'Увеличенный процент', fieldType: EnumFieldType.SWITCH },

  {
    name: 'description',
    label: 'Описание к блоку',
    fieldType: EnumFieldType.TEXTAREA
  },
  {
    name: 'birthday',
    label: 'Дата рождения',
    fieldType: EnumFieldType.CALENDAR
  },
  {
    name: 'files',
    label: 'Файлы',
    fieldType: EnumFieldType.UPLOADER,
    dropzoneOptions: {
      maxFiles: 5,
      maxSize: 1024 * 1024 * 4,
      multiple: true,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'application/pdf': []
      }
    }
  },
  {
    name: 'slider',
    label: 'Сумма кредита',
    fieldType: EnumFieldType.SLIDER,
    max: 300_000,
    min: 40_000,
    variant: 'credit'
  },
  {
    fieldType: EnumFieldType.EDITOR,
    name: 'html',
    label: 'Введите HTML',
    helperText: 'Текст преобразуется в HTML'
  }
]
