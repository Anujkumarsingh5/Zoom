"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;
  return (
    <Button
      onClick={async () => {
        await call.camera.disable();
        await call.microphone.disable();
        await call.endCall();

        // Force-stop all browser media tracks to release camera/mic hardware
        document.querySelectorAll("video, audio").forEach((el) => {
          const stream = (el as HTMLMediaElement).srcObject as MediaStream;
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            (el as HTMLMediaElement).srcObject = null;
          }
        });

        router.push("/");
      }}
      className="bg-red-500 hover:bg-red-600 text-white"
    >
      End Call for everyone
    </Button>
  );
};

export default EndCallButton;
