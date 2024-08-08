import { type ComponentProps, forwardRef, type ReactElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { Loader } from '../loader/Loader'

const buttonConfig = cva(
  'relative flex items-center justify-center gap-4 cursor-pointer rounded-sm w-[216px] outline-offset-4 outline-transparent outline-2 desk-body-regular-l transition duration-12 active:scale-[0.97] disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary:
          'bg-color-primary-default text-color-white hover:bg-color-primary-hover active:bg-color-primary-hover  focus:bg-color-primary-default focus:outline-primary-focus disabled:bg-color-primary-disabled',
        secondary:
          'bg-transparent text-color-primary-default border border-solid border-primary-default hover:bg-color-primary-tr-hover active:bg-color-primary-tr-pressed active:border-primary-hover  focus:outline-primary-focus  focus:bg-color-primary-tr-focus disabled:bg-color-blue-grey-200 disabled:text-color-primary-disabled disabled:border-transparent',
        ghost:
          'bg-transparent text-color-primary-default hover:bg-color-primary-tr-hover hover:text-color-primary-hover focus:bg-color-primary-tr-focus focus:outline-primary-focus active:bg-color-primary-tr-pressed active:text-color-primary-hover disabled:text-color-primary-disabled disabled:bg-transparent'
      },
      size: {
        sm: 'h-10',
        md: 'h-12',
        lg: 'h-14'
      },
      textFormat: {
        capitalize: 'capitalize',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        initial: 'initial'
      },
      isLoading: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      {
        intent: 'primary',
        isLoading: true,
        class: '!bg-color-primary-default'
      },
      {
        intent: 'secondary',
        isLoading: true,
        class: '!bg-color-transparent  !border-primary-hover'
      },
      {
        intent: 'ghost',
        isLoading: true,
        class: '!bg-color-blue-grey-200'
      }
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      textFormat: 'initial'
    }
  }
)

type TButtonProps = VariantProps<typeof buttonConfig>

export interface IButtonProps extends ComponentProps<'button'>, TButtonProps {
  iconLeft?: ReactElement
  iconRight?: ReactElement
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      intent,
      size,
      className,
      children,
      type = 'button',
      iconLeft,
      iconRight,
      disabled = false,
      isLoading = false,
      textFormat,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(buttonConfig({ intent, size, textFormat, isLoading }), className)}
        {...props}
      >
        {isLoading ? (
          <Loader size='sm' intent={intent!} />
        ) : (
          <>
            {iconLeft && <span className='size-5 flex items-center justify-center'>{iconLeft}</span>}
            {children}
            {iconRight && <span className='size-5 flex items-center justify-center'>{iconRight}</span>}
          </>
        )}
      </button>
    )
  }
)
