import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import z from 'zod'
import { Controlled } from '$/shared/ui'

const schema = z.object({
  test: z.string().min(3, 'Name error')
})

type Schema = z.TypeOf<typeof schema>

const Form = () => {
  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      test: ''
    }
  })

  const onSubmit = (values: Schema) => {
    toast.success(JSON.stringify(values))
  }

  const onError = (errors: any) => {
    toast.error(JSON.stringify(errors))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Controlled.MaskInputControl mask='##.##.####' control={control} name='test' label='Input' />
      <button>Submit</button>
    </form>
  )
}

const meta = {
  title: 'CONTROLLED FORM UI/MaskInput',
  component: Controlled.MaskInputControl,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    label: 'Input',
    mask: '##.##.####'
  }
} satisfies Meta<typeof Controlled.MaskInputControl>

export default meta

type Story = StoryObj<typeof Controlled.MaskInputControl>

export const Base: Story = {
  render: () => <Form />
}
