import React from 'react'
import styles from '@/molecules/molecules.module.css'

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className={styles['form__body']}>{children}</div>
)

export default Body
