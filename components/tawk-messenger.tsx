"use client";

import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export default function TawkMessenger({
  propertyID,
  widgetID,
}: {
  propertyID: string;
  widgetID: string;
}) {
  const onLoad = () => {
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
