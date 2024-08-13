import { useEffect, useMemo, useRef, useState } from 'react'

export const debounce = <Params extends unknown[]>(
  callback: (...args: Params) => void,
  delay: number
): ((...args: Params) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return function (...args: Params) {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), delay)
  }
}

export const useDebounceCallback = <Params extends unknown[], Return>(callback: (...args: Params) => Return, delay: number) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useMemo(() => debounce(callback, delay), [delay])

  return debounced
}

export const useDebounceValue = <Value>(value: Value, delay: number) => {
  const previousValueRef = useRef(value)
  const [debouncedValue, setDebounceValue] = useState(value)

  const debouncedSetState = useDebounceCallback(setDebounceValue, delay)

  useEffect(() => {
    if (previousValueRef.current === value) return
    debouncedSetState(value)
    previousValueRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return debouncedValue
}
