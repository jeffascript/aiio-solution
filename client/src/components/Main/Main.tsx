import React from 'react'
import styles from '@/components/Main/main.module.css'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles['main__container']}>
      <div className={styles['main__container-shell']}>
        <div className={styles['main__container-children']}>{children}</div>
      </div>
    </div>
  )
}

export default Main
