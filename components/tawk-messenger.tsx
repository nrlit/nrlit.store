"use client";

import { useUser } from "@clerk/nextjs";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { RefObject, useRef } from "react";

interface TawkVisitorData {
  name?: string;
  email?: string;
  // Add other possible visitor properties here
}

// Type for the ref object
interface TawkMessengerRef {
  visitor: (data: TawkVisitorData) => void;
  // Add other methods that might be available on the ref
}

// Type for the ref prop of TawkMessengerReact
type TawkMessengerRefProp = RefObject<TawkMessengerRef>;

export default function TawkMessenger({
  propertyID,
  widgetID,
}: {
  propertyID: string;
  widgetID: string;
}) {
  const user = useUser();
  const tawkMessengerRef = useRef<TawkMessengerRef>(null);

  const onLoad = () => {
    if (user.isSignedIn && user.isLoaded) {
      tawkMessengerRef.current?.visitor({
        name: user.user.fullName ?? user.user.username ?? "Guest",
        email: user.user.primaryEmailAddress?.emailAddress,
      });
    }
    console.log("Chat widget loaded!");
  };

  const onStatusChange = (status: string) => {
    console.log("Chat status changed:", status);
  };

  const onChatStarted = () => {
    console.log("Chat started");
  };

  const onChatEnded = () => {
    console.log("Chat ended");
  };

  const onPrechatSubmit = (data: Record<string, unknown>) => {
    console.log("Prechat data submitted:", data);
  };

  const onOfflineSubmit = (data: Record<string, unknown>) => {
    console.log("Offline message submitted:", data);
  };

  const onBeforeLoad = () => {
    console.log("Chat widget is about to load");
  };

  const onUnreadCountChanged = (unreadCount: number) => {
    console.log("Unread count changed:", unreadCount);
  };

  const onChatMinimized = () => {
    console.log("Chat minimized");
  };

  const onChatMaximized = () => {
    console.log("Chat maximized");
  };

  const onChatMessageSystem = (message: string) => {
    console.log("System message received:", message);
  };

  const onChatMessageVisitor = (message: string) => {
    console.log("Visitor message received:", message);
  };

  const onChatMessageAgent = (message: string) => {
    console.log("Agent message received:", message);
  };

  const onChatHidden = () => {
    console.log("Chat widget hidden");
  };

  const onAgentJoinChat = (data: { name: string; [key: string]: unknown }) => {
    console.log("Agent joined chat:", data);
  };

  const onAgentLeaveChat = (data: { name: string; [key: string]: unknown }) => {
    console.log("Agent left chat:", data);
  };

  const onChatSatisfaction = (satisfaction: string) => {
    console.log("Chat satisfaction:", satisfaction);
  };

  const onVisitorNameChanged = (visitorName: string) => {
    console.log("Visitor name changed:", visitorName);
  };

  const onFileUpload = (link: string) => {
    console.log("File uploaded:", link);
  };

  const onTagsUpdated = (tags: string[]) => {
    console.log("Tags updated:", tags);
  };

  return (
    <TawkMessengerReact
      propertyId={propertyID}
      widgetId={widgetID}
      onLoad={onLoad}
      onStatusChange={onStatusChange}
      onChatStarted={onChatStarted}
      onChatEnded={onChatEnded}
      onPrechatSubmit={onPrechatSubmit}
      onOfflineSubmit={onOfflineSubmit}
      onBeforeLoad={onBeforeLoad}
      onUnreadCountChanged={onUnreadCountChanged}
      onChatMinimized={onChatMinimized}
      onChatMaximized={onChatMaximized}
      onChatMessageSystem={onChatMessageSystem}
      onChatMessageVisitor={onChatMessageVisitor}
      onChatMessageAgent={onChatMessageAgent}
      onChatHidden={onChatHidden}
      onAgentJoinChat={onAgentJoinChat}
      onAgentLeaveChat={onAgentLeaveChat}
      onChatSatisfaction={onChatSatisfaction}
      onVisitorNameChanged={onVisitorNameChanged}
      onFileUpload={onFileUpload}
      onTagsUpdated={onTagsUpdated}
      ref={tawkMessengerRef as TawkMessengerRefProp}
      customStyle={{
        visibility: {
          desktop: {
            position: "bl", // 'bl' stands for 'bottom left'
            xOffset: "20px",
            yOffset: "20px",
          },
          mobile: {
            position: "bl", // 'bl' stands for 'bottom left'
            xOffset: "10px",
            yOffset: "10px",
          },
        },
      }}
    />
  );
}
