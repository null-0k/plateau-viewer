// src/Camera.tsx
'use client';

import { Cartesian3, HeadingPitchRoll } from 'cesium';
import { useContext, useEffect } from 'react';
import { ViewerContext } from './Viewer';

export default function Camera() {
  const viewer = useContext(ViewerContext);

  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return;

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(139.745, 35.68, 2000),
      orientation: new HeadingPitchRoll(Math.PI / 2, -Math.PI / 4, 0),
    });
  }, [viewer]);

  return null;
}