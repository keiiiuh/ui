import type { FieldError } from 'react-hook-form'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/utils'

const messageViewConfig = cva('desk-body-regular-m mt-2', {
  variants: {
    intent: {
      simple: 'text-color-tetriary',
      error: 'text-color-negative'
    }
  },
  defaultVariants: {
    intent: 'simple'
  }
})

export interface IMessageViewProps extends VariantProps<typeof messageViewConfig> {
  as?: 'div' | 'span' | 'p'
  text?: string | FieldError['message']
  className?: string
}

export const MessageView = ({ intent, as: Element = 'p', text, className, ...props }: IMessageViewProps) => {
  if (!text) return null

  return (
    <Element className={cn(messageViewConfig({ intent }), className)} {...props}>
      {text}
    </Element>
  )
}
