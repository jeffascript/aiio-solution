import React, { ReactNode } from 'react'
import styles from '@/molecules/molecules.module.css'
import { combineClassNames } from '@/utils/combineClassNames'
import { useClickAway } from '@/hooks/useClickAway'
import { useToggleItemContext } from '@/context/ToggleItemContext'

export const ModalContainer = ({ children }: { children: ReactNode }) => {
  const { isModalOpen, setIsModalOpen } = useToggleItemContext()

  const modalRef = useClickAway<HTMLDivElement>(() => setIsModalOpen(false))

  return (
    <div
      className={combineClassNames([
        styles['modal__overlay'],
        isModalOpen && styles['modal__overlay-show'],
      ])}
      role="dialog"
    >
      <div className={styles['modal__wrap']} ref={modalRef}>
        {children}
      </div>
    </div>
  )
}

export const ModalBody = ({ children }: { children: ReactNode }) => {
  return <div className={styles['modal__content']}>{children}</div>
}

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className={styles['modal__footer']}>{children}</div>
}

export const ModalHeader = ({ children }: { children: ReactNode }) => {
  return <div className={styles['modal__header']}>{children}</div>
}
