import { useEffect, useRef } from 'react'

export function useOutsideClick(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<any>(null)

  useEffect(() => {
    function handleClick(ev: MouseEvent) {
      if (!ev) return null

      const targetNode = ev.target as Node

      if (ref.current && !ref.current.contains(targetNode)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, listenCapturing)

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing)
    }
  }, [handler, listenCapturing])

  return ref
}
