declare module "@tawk.to/tawk-messenger-react" {
  import type { ComponentType } from "react";

  interface TawkMessengerProps {
    propertyId: string;
    widgetId: string;
    customStyle?: {
      zIndex?: number;
      visibility?: {
        desktop?: {
          position?: string;
          xOffset?: string;
          yOffset?: string;
        };
        mobile?: {
          position?: string;
          xOffset?: string;
          yOffset?: string;
        };
      };
    };
    onLoad?: () => void;
    onError?: (error: Error) => void;
    onStatusChange?: (status: string) => void;
    onChatMaximized?: () => void;
    onChatMinimized?: () => void;
    onChatHidden?: () => void;
    onChatStarted?: () => void;
    onChatEnded?: () => void;
    onBeforeLoad?: () => void;
    onUnreadCountChanged?: (unreadCount: number) => void;
    onPrechatSubmit?: (data: Record<string, unknown>) => void;
    onOfflineSubmit?: (data: Record<string, unknown>) => void;
    onChatMessageVisitor?: (message: string) => void;
    onChatMessageAgent?: (message: string) => void;
    onChatMessageSystem?: (message: string) => void;
    onAgentJoinChat?: (data: { name: string; [key: string]: unknown }) => void;
    onAgentLeaveChat?: (data: { name: string; [key: string]: unknown }) => void;
    onChatSatisfaction?: (satisfaction: string) => void;
    onVisitorNameChanged?: (visitorName: string) => void;
    onFileUpload?: (link: string) => void;
    onTagsUpdated?: (tags: string[]) => void;
  }

  const TawkMessengerReact: ComponentType<TawkMessengerProps>;

  export default TawkMessengerReact;
}
