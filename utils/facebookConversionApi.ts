import crypto from "crypto";

const FACEBOOK_ACCESS_TOKEN =
  process.env.FACEBOOK_CAPI_TOKEN! ||
  "EAAISBkSsO1QBO6utNHEdtR75hZCjQ2TG6yU9wn6acpMjLDqZAPzp9JFyiFjOzlMpW8XA1wpOXMHyVPuryKofciLo5IWqQe5uYR1ZCX8GYlmyHdIFdXU3rYZBC50bveQtpesRBcw6jhTZCc73LSQ4ZBAaMWqZAZBDZCbmntq1M5Q2dRzmj08WlXtmhCFztZA8ZA7rTmqBgZDZD"; // Replace with your actual access token
const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID! || "523534143408812"; // Replace with your actual Pixel ID

interface UserData {
  em?: string; // Email
  ph?: string; // Phone
  fn?: string; // First Name
  ln?: string; // Last Name
  ge?: string; // Gender
  db?: string; // Date of Birth
  ct?: string; // City
  st?: string; // State
  zp?: string; // Zip
  country?: string;
  external_id?: string;
}

interface EventData {
  event_name: string;
  event_time: number;
  event_id: string;
  user_data: UserData & {
    client_ip_address: string;
    client_user_agent: string;
  };
  custom_data?: Record<string, string | number>;
  event_source_url?: string;
  action_source: "website" | "app" | "phone_call" | "chat" | "email" | "other";
}

function hashData(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function hashUserData(userData: UserData): UserData {
  const hashedData: UserData = {};
  for (const [key, value] of Object.entries(userData)) {
    if (value) {
      hashedData[key as keyof UserData] = hashData(value.toLowerCase().trim());
    }
  }
  return hashedData;
}

export async function sendServerEvent(eventData: EventData): Promise<void> {
  const url = `https://graph.facebook.com/v17.0/${FB_PIXEL_ID}/events`;

  // Hash user data
  const { client_ip_address, client_user_agent, ...restUserData } =
    eventData.user_data;
  eventData.user_data = {
    ...hashUserData(restUserData),
    client_ip_address,
    client_user_agent,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [eventData],
        access_token: FACEBOOK_ACCESS_TOKEN,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Event sent successfully:", result);
  } catch (error) {
    console.error("Failed to send event to Facebook:", error);
  }
}
