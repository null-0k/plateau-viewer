'use client';

import { Cesium3DTileStyle, Cesium3DTileset } from 'cesium';
import React, { useContext, useEffect, useState } from 'react';
import { ViewerContext } from './Viewer';

export interface PlateauTilesetProps {
  path: string;
  color?: string;
}

export const PlateauTileset: React.FC<PlateauTilesetProps> = ({
  path,
  color = '#ffffff',
}) => {
  const [tileset, setTileset] = useState<Cesium3DTileset>();
  const viewer = useContext(ViewerContext);

  /** tileset 取得 */
  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return;

    let cancelled = false;

    (async () => {
      const newTileset = await Cesium3DTileset.fromUrl(
        `https://plateau.geospatial.jp/main/data/3d-tiles/${path}/tileset.json`
      );
      if (cancelled || viewer.isDestroyed()) {
        newTileset.destroy();
        return;
      }
      viewer.scene.primitives.add(newTileset);
      setTileset(newTileset);
    })();

    return () => {
      cancelled = true;
      if (tileset && !viewer.isDestroyed()) {
        viewer.scene.primitives.remove(tileset);
        tileset.destroy();
      }
      setTileset(undefined);
    };
  }, [path, viewer]);

  /** スタイル変更 */
  useEffect(() => {
    if (tileset) {
      tileset.style = new Cesium3DTileStyle({
        color: `color("${color}")`,
      });
    }
  }, [color, tileset]);

  return null;
};