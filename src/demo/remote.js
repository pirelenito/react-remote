import React from 'react'
import Entanglement from '../entanglement'
import Field from './field'

const MaterializedField = Entanglement.materialize({ name: 'Field', constructor: Field })

export default function Remote({ adapter }) {
  return (
    <Entanglement adapter={adapter}>
      <MaterializedField />
    </Entanglement>
  )
}
