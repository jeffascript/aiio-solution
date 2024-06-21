import React from 'react'
import { Modal, ModalBody, ModalFooter } from '@/molecules/Modal'
import Button from '@/molecules/Button'
import { useToggleItemContext } from '@/context/ToggleItemContext'
import { useToggleItem } from '@/hooks/useToggleItem'
import { ListRender } from './ListRender'

function DoneShowcaseModal() {
  const { toggleModal, doneResult } = useToggleItemContext()
  const { handleCloseAllForms } = useToggleItem()

  const { selectedProducts, selectedSubcategories, selectedSubproducts } = doneResult

  return (
    <Modal>
      <ModalBody>
        <ListRender items={selectedProducts} label="Products" />
        <ListRender items={selectedSubcategories} label="Sub categories" />
        <ListRender items={selectedSubproducts} label="Sub products" />
      </ModalBody>
      <ModalFooter>
        <Button
          isModal
          onClick={() => {
            toggleModal()
            handleCloseAllForms()
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DoneShowcaseModal
