"use client"

import React from 'react'

const Index = () => {
  const testSrc = "https://v.kr.kollus.com/XoABcTpT?"
  
  const iframeRef = React.useRef<any>()
  const [videoCurrentTime, setVideoCurrentTime] = React.useState(0)
  
  React.useEffect(() => {
    console.log("iframeRef", iframeRef.current?.contentWindow)
  }, [iframeRef])

  const controller = new VgControllerClient({
    target_window: iframeRef.current?.contentWindow
  })
  
  controller.on('progress', (percent: number, position: number, duration: number) => {
    console.log('percent', percent)
    console.log('position', position)
    let time = controller.get_current_time()
    console.log("time", time)
    console.log('duration', duration)
  })


  console.log("controller", controller)
  console.log("videoCurrentTime", videoCurrentTime)

  const playClicked = () => {
    controller.play()
  }
  
  const pauseClicked = () => {
    controller.pause()
  }

  return (
    <div>
      <iframe
        src={testSrc ?? ''}
        allow="encrypted-media"
        allowFullScreen={true}
        id="video-iframe"
        ref={iframeRef}
      >

      </iframe>
      
      <div>
        <button onClick={() => playClicked()}>재생</button>
        <button onClick={() => pauseClicked()}>일시정지</button>
      </div>
    </div>
  )
}

export default Index