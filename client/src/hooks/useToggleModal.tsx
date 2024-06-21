import { useCallback, useState } from 'react'

export const useToggleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState)
  }, [isModalOpen])

  //   const handleUserCardClick = useCallback((user: User | null) => {
  //     const isSelected = !!user
  //     setIsUserSelected(isSelected)
  //     setSelectedUser(isSelected ? user : null)
  //   }, [])

  //   const handleCloseModal = useCallback(() => {
  //     setIsUserSelected(false)
  //   }, [])

  return { isModalOpen, toggleModal, setIsModalOpen }
}
