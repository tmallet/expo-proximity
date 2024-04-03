import * as React from 'react'

import { ExpoProximityViewProps } from './ExpoProximity.types'

export default function ExpoProximityView(props: ExpoProximityViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  )
}
