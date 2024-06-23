import React, { useCallback } from 'react'
import { ModalBody, ModalContainer, ModalFooter } from '@/molecules/Modal'
import Button from '@/molecules/Button'
import { useToggleItemContext } from '@/context/ToggleItemContext'
import { useToggleItem } from '@/hooks/useToggleItem'
import { ListRender } from './ListRender'

function ModalDoneShowcase() {
  const { toggleModal, doneResult } = useToggleItemContext()
  const { handleCloseAllForms } = useToggleItem()

  const { selectedProducts, selectedSubcategories, selectedSubproducts } = doneResult

  const handleSave = useCallback(() => {
    toggleModal()
    handleCloseAllForms()
  }, [])

  return (
    <ModalDoneShowcase.Container>
      <ModalDoneShowcase.Body>
        <ModalDoneShowcase.List items={selectedProducts} label="Products" />
        <ModalDoneShowcase.List items={selectedSubcategories} label="Sub categories" />
        <ModalDoneShowcase.List items={selectedSubproducts} label="Sub products" />
      </ModalDoneShowcase.Body>
      <ModalDoneShowcase.Footer>
        <Button isModal onClick={handleSave}>
          Save
        </Button>
      </ModalDoneShowcase.Footer>
    </ModalDoneShowcase.Container>
  )
}

ModalDoneShowcase.Container = ModalContainer
ModalDoneShowcase.Body = ModalBody
ModalDoneShowcase.List = ListRender
ModalDoneShowcase.Footer = ModalFooter

export default ModalDoneShowcase
