import fetch from "node-fetch";
import { writeFileSync } from "fs";

const conversations = [
  {
    title: "Dinner Plans",
    messages: [
      {
        text: "Hey, want to grab dinner tonight?",
        isReceiver: false,
        timestamp: "6:02 PM",
      },
      {
        text: "Sure! What time were you thinking?",
        isReceiver: true,
        timestamp: "6:05 PM",
      },
      {
        text: "How about 7:30? That new Italian place?",
        isReceiver: false,
        timestamp: "6:07 PM",
      },
      {
        text: "Perfect! See you there 😊",
        isReceiver: true,
        timestamp: "6:08 PM",
      },
    ],
  },
  {
    title: "Movie Night",
    messages: [
      {
        text: "Have you seen the new Marvel movie?",
        isReceiver: false,
        timestamp: "3:15 PM",
      },
      {
        text: "Not yet! Been wanting to though",
        isReceiver: true,
        timestamp: "3:20 PM",
      },
      {
        text: "Want to go this weekend?",
        isReceiver: false,
        timestamp: "3:21 PM",
      },
      {
        text: "Yes! Saturday afternoon?",
        isReceiver: true,
        timestamp: "3:25 PM",
      },
      {
        text: "Works for me! I'll check showtimes",
        isReceiver: false,
        timestamp: "3:26 PM",
      },
    ],
  },
  {
    title: "Work Project",
    messages: [
      {
        text: "How's the presentation coming along?",
        isReceiver: false,
        timestamp: "10:30 AM",
      },
      {
        text: "Almost done! Just need to add some graphs",
        isReceiver: true,
        timestamp: "10:45 AM",
      },
      {
        text: "Need any help with that?",
        isReceiver: false,
        timestamp: "10:47 AM",
      },
      {
        text: "Actually yes, could you send me last month's data?",
        isReceiver: true,
        timestamp: "10:50 AM",
      },
      {
        text: "Sure thing, sending it now!",
        isReceiver: false,
        timestamp: "10:51 AM",
      },
    ],
  },
];

async function generateImage(
  conversation: (typeof conversations)[0],
  index: number
) {
  try {
    console.log(`\nGenerating image for conversation: ${conversation.title}`);
    console.log("Sending request to server...");

    const requestBody = JSON.stringify({ messages: conversation.messages });
    console.log("Request body:", requestBody);

    const response = await fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    console.log("Getting response buffer...");
    const buffer = await response.buffer();
    console.log("Buffer size:", buffer.length, "bytes");

    const filename = `conversation-${index + 1}-${conversation.title
      .toLowerCase()
      .replace(/\s+/g, "-")}.png`;
    console.log("Writing file:", filename);

    writeFileSync(filename, buffer);
    console.log(`Successfully generated ${filename}`);
  } catch (error) {
    console.error(`Error generating ${conversation.title}:`, error);
  }
}

async function generateAllConversations() {
  console.log("Starting conversation generation...");
  console.log(`Will generate ${conversations.length} conversations`);

  for (let i = 0; i < conversations.length; i++) {
    console.log(
      `\nProcessing conversation ${i + 1} of ${conversations.length}`
    );
    await generateImage(conversations[i], i);
    console.log("Waiting before next request...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log("\nFinished generating all conversations!");
}

console.log("Script started");
generateAllConversations().catch(console.error);
