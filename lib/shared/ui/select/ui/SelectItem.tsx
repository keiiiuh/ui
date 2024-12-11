import { components, type OptionProps } from 'react-select'
import type { DeepPartial } from '$/shared/types'
import type { FieldAttachment } from '$/shared/ui/formElements/ui'
import { cn } from '$/shared/utils'

type FieldAttachmentProps = React.ComponentPropsWithoutRef<typeof FieldAttachment>

export type SelectItemOption = {
  id: string | number
  value: string
  label: string
  additionalText?: string
  disabled?: boolean
  attachment?: {
    left?: DeepPartial<FieldAttachmentProps>
    right?: DeepPartial<FieldAttachmentProps>
  }
}

export type SelectItemClasses = {
  container?: string
  additionalText?: string
}

type SelectItemProps = OptionProps<SelectItemOption> & {
  classes?: SelectItemClasses
}

export const SelectItem = ({
  isSelected,
  label,
  data,
  innerProps,
  innerRef,
  selectProps,
  isFocused,
  classes,
  ...props
}: SelectItemProps) => {
  return (
    <components.Option
      {...props}
      isFocused={isFocused}
      selectProps={selectProps}
      data={data}
      innerRef={innerRef}
      label={label}
      isSelected={isSelected}
      innerProps={innerProps}
      isDisabled={Boolean(data.disabled)}
      cx={(_, classNames) =>
        cn(
          'unset-all-apply desk-body-regular-l cursor-pointer rounded-sm px-2 py-4 bg-color-white',
          'text-color-dark hover:bg-color-primary-tr-hover hover:text-color-primary-hover',
          '[&:not(:last-child)]:mb-1 [&>p]:hover:text-color-secondary',
          {
            'pointer-events-none !bg-color-primary-tr-hover !text-color-primary-hover': isSelected || (isSelected && isFocused),
            'pointer-events-none text-color-disabled': data.disabled
          },
          classNames,
          classes?.container,
          innerProps.className
        )
      }
    >
      {label}
      {data.additionalText && (
        <p className={cn('desk-body-regular-s text-color-tetriary', classes?.additionalText)}>{data.additionalText}</p>
      )}
    </components.Option>
  )
}
