"use client";
import HomeCard from "@/components/HomeCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user} = useUser();
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })

  const [callDetails, setCallDetails] = useState<Call>()
  
  const createMeeting = async () => {
    // API call to create meeting
    if(!client || !user) return;

    try {
        if(!values.dateTime) {
          toast.warning("Please select a date and time for the meeting.", { position: "top-right" })
          return;
        }

      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if(!call) throw new Error('Failed to create call')
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
    const description = values.description || 'Instant meeting'

    await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description
        }
      }
    })

    setCallDetails(call)

    if(!values.description){
      router.push(`/meeting/${call.id}`)
    }

    toast.success("Meeting created successfully!", { position: "top-right" })

    } catch (error) {
      console.log(error)
      toast.error("Failed to create meeting. Please try again.", { position: "top-right" })
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
