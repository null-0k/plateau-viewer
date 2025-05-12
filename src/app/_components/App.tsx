import React from 'react'

import  Camera  from './Camera'
import { Clock } from './Clock'
import { Lighting } from './Lighting'
import  { PlateauTerrain } from './PlateauTerrain'
import { PlateauTileset } from './PlateauTileset'
import { Viewer } from './Viewer'

export default function App()  {
  return (
    <Viewer>
      <Camera />
      {/* <Clock />
      <Lighting />
      <PlateauTerrain /> */}
      <PlateauTileset path='bldg/13100_tokyo/13101_chiyoda-ku/notexture' />
      <PlateauTileset path='bldg/13100_tokyo/13102_chuo-ku/notexture' />
    </Viewer>
  )
}