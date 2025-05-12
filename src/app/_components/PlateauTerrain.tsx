// import { CesiumTerrainProvider, IonResource } from 'cesium'
// import React, { useContext, useEffect } from 'react'

// import { ViewerContext } from './Viewer'

// export default function () {  
//   const viewer = useContext(ViewerContext);

//   useEffect(() => {
//     if (!viewer || viewer.isDestroyed()) return;

//     (async () => {
//       // accessToken はもう書かない
//       const terrain = await CesiumTerrainProvider.fromIonAssetId(770371, {
//         // requestVertexNormals: true,
//         // requestWaterMask: true,
//       });
//       viewer.terrainProvider = terrain;
//     })();
//   }, [viewer]);

//   return null;
// };

import {
  CesiumTerrainProvider,
  IonResource,
  createWorldTerrainAsync // 非同期でデフォルト地形を作成するメソッド
} from 'cesium';
import React, { useContext, useEffect } from 'react';
import { ViewerContext } from './Viewer';

export const PlateauTerrain: React.FC = () => {
  const viewer = useContext(ViewerContext);

  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) {
      return;
    }

    let isMounted = true; // コンポーネントのマウント状態を追跡

    const setPlateauTerrain = async () => {
      try {
        console.log('[PlateauTerrain] Fetching Ion resource for terrain asset ID 770371...');
        const resource = await IonResource.fromAssetId(770371, {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2UyMjcwOS00MDY1LTQxYjEtYjZjMy00YTU0ZTg5MmViYWQiLCJpZCI6ODAzMDYsImlhdCI6MTY0Mjc0ODI2MX0.dkwAL1CcljUV7NA7fDbhXXnmyZQU_c-G5zRx8PtEcxE',
        });
        console.log('[PlateauTerrain] Ion resource fetched:', resource);

        if (!isMounted) return; // アンマウントされていたら処理中断

        console.log('[PlateauTerrain] Creating terrain provider using CesiumTerrainProvider.fromUrl...');
        // fromUrl を使用して TerrainProvider を非同期に作成
        const plateauTerrainProvider = await CesiumTerrainProvider.fromUrl(resource, {
          // 必要に応じて追加オプションを指定
          // requestWaterMask: true,
          // requestVertexNormals: true
        });
        console.log('[PlateauTerrain] Terrain provider created:', plateauTerrainProvider);

        if (!isMounted) return; // 作成中にアンマウントされた場合

        // viewer の terrainProvider を設定
        // viewerがまだ有効か再度チェック
        if (viewer && !viewer.isDestroyed()) {
          viewer.terrainProvider = plateauTerrainProvider;
          console.log('[PlateauTerrain] Plateau terrain provider set successfully on viewer.');
        }

      } catch (error) {
        if (isMounted) {
          console.error('[PlateauTerrain] Failed to set Plateau terrain provider:', error);
          // エラーが発生した場合、デフォルトの地形に戻すなどのフォールバック処理も検討
          try {
             if (viewer && !viewer.isDestroyed()) {
                console.log('[PlateauTerrain] Falling back to default world terrain.');
                viewer.terrainProvider = await createWorldTerrainAsync(); // デフォルトに戻す
             }
          } catch(fallbackError) {
             console.error('[PlateauTerrain] Failed to set default world terrain after error:', fallbackError);
          }
        }
      }
    };

    setPlateauTerrain();

    // クリーンアップ関数
    return () => {
      isMounted = false; // アンマウント状態に設定
      console.log('[PlateauTerrain] Component unmounting. Resetting terrain provider...');
      // コンポーネントがアンマウントされるときに地形をデフォルトに戻す
      if (viewer && !viewer.isDestroyed()) {
        // 非同期でデフォルト地形を作成し設定
        createWorldTerrainAsync()
          .then(defaultTerrain => {
             // アンマウント後でも viewer が破棄されていなければ設定
             if (viewer && !viewer.isDestroyed()) {
                 viewer.terrainProvider = defaultTerrain;
                 console.log('[PlateauTerrain] Terrain provider reset to default world terrain.');
             }
          })
          .catch(error => {
             console.error('[PlateauTerrain] Failed to reset terrain provider on unmount:', error);
          });
      }
    };

  }, [viewer]); // viewer が変更されたら再実行

  return null; // このコンポーネントは何もレンダリングしない
};