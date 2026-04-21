"use client";
import HomeCard from "@/components/HomeCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

      {!callDetails ? (
        <MeetingModel
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        // className="text-center"
        // buttonText="Schedule Meeting"
        handleClick={createMeeting}
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
          <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e)=>{
            setValues({...values, description: e.target.value})
          }}/>
          
        </div>

       <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-2">Select Date and Time</label>
         <DatePicker selected={values.dateTime} onChange={(date: Date | null)=>setValues({...values, dateTime: date!})}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full rounded bg-dark-2 p-2 focus:outline-none"/>

        </div>
      </MeetingModel>
      ) : (
        <MeetingModel
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
        // buttonText="Start Meeting"
        handleClick={()=>{
          // navigator.clipboard.writeText
          toast.success( 'Link copied', {position:"top-right"})
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
        buttonText="Copy Meeting Link"
      />
      )}
      
    </section>
  );
};

export default MeetingTypeList;
