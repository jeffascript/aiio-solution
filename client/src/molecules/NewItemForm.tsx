import PolymorphicInput from '@/atoms/PolyMorphicInput'
import React from 'react'
import styles from '@/molecules/molecules.module.css'
import Button from './Button'
import { getStyleToken } from '@/utils/token'
import PlusIcon from '@/assets/plus.svg?react'

interface NewItemFormProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAdd: () => void
  props?: React.Ref<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
}

const NewItemForm: React.FC<NewItemFormProps> = ({ value, onChange, onAdd, props }) => (
  <div className={styles['form__newitem']} {...props}>
    <PolymorphicInput value={value} onChange={onChange} />
    <Button onClick={onAdd} style={{ background: getStyleToken('greyColor') }} Icon={PlusIcon}>
      Add
    </Button>
  </div>
)

export default NewItemForm
