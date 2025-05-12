'use client'

import { NextPage } from 'next'
import React from 'react'
import App from './_components/App'

// Cesiumが実行時にWeb Workerのためのスクリプトを読み込むために、「6.3.2　環境構築」
// で作成したpublic/cesiumの静的ファイルへのパスを指定します。
if (typeof window !== 'undefined') {
  window.CESIUM_BASE_URL = '/cesium'
}

export default function Index() {
  return (
    <>
      <App />
    </>
  )
}
