"use client";

import MeetingInfoModal from "@/components/meeting-info-modal";
import { Button } from "@/components/ui/button";
import {
  CancelCallButton,
  DefaultParticipantViewUI,
  hasScreenShare,
  ParticipantView,
  ScreenShareButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Images, Info } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import MeetingLeaveModal from "./meeting-leave-modal";
import ImageSidebar from "./image-sidebar";

type blurLevel = "none" | "low" | "medium" | "high" | "disable";

const SpeakerView = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const [participantInSpotlight, ...otherParticipants] = useParticipants();
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [blurLevelState, setBlurLevelState] = useState<blurLevel>("none");
  const isOneToOneCall = otherParticipants.length === 1;

  useEffect(() => {
    setMeetingUrl(window.location.href);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full p-4 text-white">
      {isOneToOneCall ? (
        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex items-center justify-center">
            <ParticipantView
              participant={participantInSpotlight}
              trackType={
                hasScreenShare(participantInSpotlight)
                  ? "screenShareTrack"
                  : "videoTrack"
              }
              ParticipantViewUI={DefaultParticipantViewUI}
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ParticipantView
              participant={otherParticipants[0]}
              trackType={
                hasScreenShare(otherParticipants[0])
                  ? "screenShareTrack"
                  : "videoTrack"
              }
              ParticipantViewUI={DefaultParticipantViewUI}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full h-full">
            {[participantInSpotlight, ...otherParticipants].map(
              (participant) => (
                <div
                  key={participant.sessionId}
                  className="w-full aspect-video rounded overflow-hidden bg-black"
                >
                  <ParticipantView
                    participant={participant}
                    trackType={
                      hasScreenShare(participant)
                        ? "screenShareTrack"
                        : "videoTrack"
                    }
                    ParticipantViewUI={DefaultParticipantViewUI}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Control buttons */}
      <CustomCallControls>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-9 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white"
          onClick={() => setShowMeetingInfo(true)}
        >
          <Info className="w-5 h-5" />
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white"
            >
              <Images className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <ImageSidebar
              blurLevel={blurLevelState}
              setOpen={setOpen}
              setBlurLevel={setBlurLevelState}
            />
          </SheetContent>
        </Sheet>

        <SpeakingWhileMutedNotification>
          <ToggleAudioPublishingButton />
        </SpeakingWhileMutedNotification>
        <ToggleVideoPublishingButton />
        <ScreenShareButton />
        {call && <CancelCallButton onClick={() => setShowLeaveAlert(true)} />}
      </CustomCallControls>

      {/* Modals */}
      <MeetingInfoModal
        isOpen={showMeetingInfo}
        onClose={() => setShowMeetingInfo(false)}
        meetingUrl={meetingUrl}
      />
      <MeetingLeaveModal
        showLeaveAlert={showLeaveAlert}
        setShowLeaveAlert={setShowLeaveAlert}
      />
    </div>
  );
};

export default SpeakerView;

const CustomCallControls = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="str-video__call-controls mt-4 flex justify-center gap-2 flex-wrap">
      {children}
    </div>
  );
};
