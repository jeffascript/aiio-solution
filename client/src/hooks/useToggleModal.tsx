import { useCallback, useState } from 'react'

export const useToggleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState)
  }, [isModalOpen])

  return { isModalOpen, toggleModal, setIsModalOpen }
}
