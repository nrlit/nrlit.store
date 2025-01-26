"use client"

import { event } from "./facebookPixel"
import { v4 as uuidv4 } from "uuid"

interface EventOptions {
  content_name?: string
  content_type?: string
  content_ids?: string[]
  contents?: Array<{ id: string; quantity: number }>
  value?: number
  currency?: string
  num_items?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendEvent = (eventName: string, options: EventOptions, userData: any = {}) => {
  // Generate a unique event ID for deduplication
  const eventId = uuidv4()

  // Client-side tracking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event(eventName as any, { ...options, eventID: eventId })

  // Server-side tracking
  const eventData = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user_data: {
      ...userData,
      client_ip_address: "{{client_ip_address}}",
      client_user_agent: "{{client_user_agent}}",
    },
    custom_data: options,
    event_source_url: window.location.href,
    action_source: "website" as const,
  }

  // Use sendBeacon for better performance and to ensure the request is sent even if the page is unloading
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(eventData)], { type: "application/json" })
    navigator.sendBeacon("/api/facebook-event", blob)
  } else {
    fetch("/api/facebook-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
      keepalive: true,
    })
  }
}

export const contentView = (contentName: string, contentId: string, contentType: string) => {
  sendEvent("ViewContent", {
    content_name: contentName,
    content_ids: [contentId],
    content_type: contentType,
  })
}

export const addToCart = (
  contentName: string,
  contentId: string,
  value: number,
  currency: string,
  quantity: number,
) => {
  sendEvent("AddToCart", {
    content_name: contentName,
    content_ids: [contentId],
    content_type: "product",
    value,
    currency,
    contents: [{ id: contentId, quantity }],
  })
}

export const initiateCheckout = (
  value: number,
  currency: string,
  contents: Array<{ id: string; quantity: number }>,
) => {
  sendEvent("InitiateCheckout", {
    value,
    currency,
    contents,
    num_items: contents.reduce((sum, item) => sum + item.quantity, 0),
  })
}

export const purchase = (value: number, currency: string, contents: Array<{ id: string; quantity: number }>) => {
  sendEvent("Purchase", {
    value,
    currency,
    contents,
    content_type: "product",
  })
}

