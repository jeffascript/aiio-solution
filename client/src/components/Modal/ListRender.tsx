import React from 'react'

export function ListRender({ label, items }: { label: string; items?: string[] }) {
  return items && items.length > 0 ? (
    <React.Fragment>
      <h5>{label}</h5>
      <small>{items.join(', ')}</small>
    </React.Fragment>
  ) : null
}
