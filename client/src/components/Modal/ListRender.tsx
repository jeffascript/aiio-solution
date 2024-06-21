import React from 'react'

export function ListRender({ label, items }: { label: string; items?: string[] }) {
  return (
    <>
      <h5>{label}</h5>
      {items && items.length > 0 ? (
        <React.Fragment>
          <small>{items.join(', ')}</small>
        </React.Fragment>
      ) : null}
    </>
  )
}
