/* eslint-disable react/react-in-jsx-scope */

import { ModalBody, ModalContainer, ModalFooter } from '@/molecules/Modal'
import Button from '@/molecules/Button'
import { useToggleItemContext } from '@/context/ToggleItemContext'
import { useToggleItem } from '@/hooks/useToggleItem'
import { ListRender } from './ListRender'
import usePostData from '@/hooks/usePostData'
import { API_CONFIG } from '@/utils/config'

function ModalDoneShowcase() {
  const { toggleModal, doneResult, doneResultAsNode } = useToggleItemContext()
  const { handleCloseAllForms } = useToggleItem()
  const { postData } = usePostData()

  const { selectedProducts, selectedSubcategories, selectedSubproducts } = doneResult

  const handleSave = () => {
    toggleModal()
    if (!doneResultAsNode || !Object.keys(doneResultAsNode).length) return handleCloseAllForms()
    postData(API_CONFIG.SAVE_DATA_URL, doneResultAsNode)
    handleCloseAllForms()
  }

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
