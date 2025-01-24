"use client";

import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export default function TawkMessenger() {
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

  return (
    <TawkMessengerReact
      propertyId={process.env.TAWK_PROPERTY_ID!}
      widgetId={process.env.TAWK_WIDGET_ID!}
      onLoad={onLoad}
      onStatusChange={onStatusChange}
      onChatStarted={onChatStarted}
      onChatEnded={onChatEnded}
      onPrechatSubmit={onPrechatSubmit}
      onOfflineSubmit={onOfflineSubmit}
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
