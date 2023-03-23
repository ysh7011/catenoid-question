"use client"

import React from 'react'
declare var VgControllerClient: any

const Index = () => {
  const [controller, setController] = React.useState<any>()

  // 새로고침을 염두하여 testSrc를 초기에 업데이트를 시켜야한다.
  const [testSrc, setTestSrc] = React.useState('')
  React.useEffect(() => {
    setTestSrc("https://v.kr.kollus.com/XoABcTpT?")
  }, [])
  
  const iframeRef = React.useRef<any>()
  const [videoCurrentTime, setVideoCurrentTime] = React.useState(0)

  const load = React.useCallback<any>(() => {
    const vgController = new VgControllerClient({
      target_window: iframeRef.current?.contentWindow
    })

    vgController.on('progress', (percent: number, position: number, duration: number) => {
      console.log('percent', percent)
      console.log('position', position)
      let time = vgController.get_current_time()
      console.log("time", time)
      console.log('duration', duration)
  
      setVideoCurrentTime(position)
    })

    setController(vgController)
  }, [])

  const playClicked = () => {
    controller.play()
  }
  const pauseClicked = () => {
    controller.pause()
  }

  // const playClicked = React.useCallback<any>(() => {
  //   controller.play(true)
  // }, [controller])

  // const pauseClicked = React.useCallback<any>(() => {
  //   controller.pause()
  // }, [controller])
  
  // React.useEffect(() => {
  //   if(!controller) return
  //   console.log("iframeRef", iframeRef.current?.contentWindow)
  //   iframeRef.current.focus()
  // }, [iframeRef, controller])

  
  console.log("controller", controller)
  console.log("videoCurrentTime", videoCurrentTime)
  
  return (
    <div>
      <iframe
        src={testSrc ?? ''}
        frameBorder="0"
        allow="encrypted-media;autoplay"
        allowFullScreen={true}
        id="video-iframe"
        ref={iframeRef}
        onLoad={load}
        // width={650}
        // height={300}
      >
      </iframe>
      
      <div>
        <button onClick={() => playClicked()}>재생</button>
        <button onClick={() => pauseClicked()}>일시정지</button>
      </div>
      <p>재생시간: {videoCurrentTime}</p>
    </div>
  )
}

export default Index