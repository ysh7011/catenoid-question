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
  const [isIframeLoad, setIsIframeLoad] = React.useState(false)
  const [videoCurrentTime, setVideoCurrentTime] = React.useState(0)

  const load = React.useCallback<any>(() => {
    const vgController = new VgControllerClient({
      target_window: iframeRef.current?.contentWindow
    })
    console.log('iframe 로드됨')
    setIsIframeLoad(!isIframeLoad)

    vgController.on('progress', (percent: number, position: number, duration: number) => {
      console.log('position', position)
      setVideoCurrentTime(position)
    })

    setController(vgController)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIframeLoad])

  const playClicked = () => {
    controller.play()
  }
  const pauseClicked = () => {
    controller.pause()
  }

  const timeToString = (time: number = 0, player?: boolean): string => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60) - hours * 60
    const seconds = player ? Math.floor(time - minutes * 60 - hours * 3600) : (time - minutes * 60 - hours * 3600).toFixed(2)
    // 00:00:09  // 00:00:09.04
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${Number(seconds) < 10 ? `0${seconds}` : seconds}`
  }

  console.log("videoCurrentTime", videoCurrentTime)

  const progressOnChange = React.useCallback((time: number) => {
    console.log("이동할곳",time)
    controller.play(time)  //비디오 현재시간을 progress바에서 선택한곳으로 이동
    setVideoCurrentTime(time) // 우리의 시간기준을 progress바에서 선택한곳으로 이동
  }, [setVideoCurrentTime, controller])
  
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
      >
      </iframe>
      
      <div>
        <button onClick={() => playClicked()}>재생</button>
        <button onClick={() => pauseClicked()}>일시정지</button>
      </div>
      <p>{timeToString(videoCurrentTime, true)}</p>
      <div>
        <button onClick={() => progressOnChange(4.22)}>4.22초로 이동</button>
      </div>
      <div>
        <button onClick={() => progressOnChange(11.89)}>11.89초로 이동</button>
      </div>
      <div>
        <button onClick={() => progressOnChange(14.64)}>14.64초로 이동</button>
      </div>
      <div>
        <button onClick={() => progressOnChange(17.65554)}>17.65554초로 이동</button>
      </div>
    </div>
  )
}

export default Index