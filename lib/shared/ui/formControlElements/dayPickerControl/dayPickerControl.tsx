'use client'

import { memo } from 'react'
import { type DateRange } from 'react-day-picker'
import { type Control, type FieldPath, type FieldValues, useController, type UseControllerProps } from 'react-hook-form'
import { Calendar } from '../../calendar'
import type { TControlledInputProps } from '../model'

type CalendarProps = React.ComponentPropsWithoutRef<typeof Calendar>

type DayPickerControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
  TControlledInputProps<TFieldValues> &
  Omit<CalendarProps, 'selected' | 'onSelect'> & {
    control: Control<TFieldValues>
  }

const InnerComponent = <T extends FieldValues = FieldValues>({
  control,
  name,
  disabled,
  rules,
  mode,
  shouldUnregister,
  defaultValue,
  ...props
}: DayPickerControlProps<T>) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
    disabled,
    rules,
    shouldUnregister
  })

  const { value, onChange, ...restField } = field

  let selected: Date | DateRange | undefined = undefined

  switch (true) {
    case mode === 'single' && typeof value === 'string':
      selected = new Date(value)
      break
    case mode === 'range' && typeof value === 'object' && 'from' in value:
      const { from, to } = value

      selected = {
        from: new Date(from),
        to: to ? new Date(to) : undefined
      }
  }

  const onSelect = (date?: Date | DateRange) => {
    if (date) {
      if (date instanceof Date) {
        onChange(date.toISOString())
      } else if (typeof date === 'object' && 'from' in date) {
        const data = {
          from: date.from?.toISOString(),
          to: date.to?.toISOString()
        }

        onChange(data)
      }
    }
  }

  return (
    <Calendar
      {...restField}
      {...props}
      className='absolute right-0 top-full'
      mode={mode}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      selected={selected}
      onSelect={onSelect}
    />
  )
}

export const DayPickerControl = memo(InnerComponent) as typeof InnerComponent
