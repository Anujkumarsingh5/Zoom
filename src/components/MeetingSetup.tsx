import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import  { useEffect, useState } from 'react'

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete: (value:boolean)=>void}) => {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false)

    const call = useCall()

    if(!call){
        throw new Error('usecall must be used within StreamCall component provider')
    }

    // toggle mic and cam based on the isMicCamToggleOn state
    useEffect(()=>{
        if(isMicCamToggleOn){
            call?.camera.disable(); 
            call?.microphone.disable()
        }
        else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggleOn])

    // Stop camera/mic when user navigates away (e.g. presses back)
    useEffect(()=>{
        return () => {
            call?.camera.disable()
            call?.microphone.disable()

            // Force-stop all browser media tracks to release camera/mic hardware
            document.querySelectorAll('video, audio').forEach((el) => {
                const stream = (el as HTMLMediaElement).srcObject as MediaStream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop())
                    ;(el as HTMLMediaElement).srcObject = null
                }
            })
        }
    }, [])
  return (
    <div className='flex h-screen w-full flex-col items-center gap-3 text-white'>
     <h1 className='text-2xl font-bold'>Setup </h1>   
        <VideoPreview />

    <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium '>
            <input type="checkbox" checked={isMicCamToggleOn} onChange={(e)=>setIsMicCamToggleOn(e.target.checked)} />
            Join with mic and camera off
        </label>
        <DeviceSettings />
    </div> 
    <button className='rounded-md bg-green-500 px-4 py-2.5 cursor-pointer' onClick={()=>{
        call.join()

        setIsSetupComplete(true)
    }}>Join meeting</button>
    </div>
  )
}

export default MeetingSetup