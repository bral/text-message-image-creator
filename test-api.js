import fetch from "node-fetch";

const testMessage = {
  messages: [
    {
      text: "Hey! Are you free this weekend?",
      isReceiver: false,
      timestamp: "2:14 PM",
    },
    {
      text: "Yeah, what's up? 😊",
      isReceiver: true,
      timestamp: "2:15 PM",
    },
    {
      text: "Want to check out that new coffee place downtown?",
      isReceiver: false,
      timestamp: "2:15 PM",
    },
    {
      text: "The one that just opened? I heard it's really good!",
      isReceiver: true,
      timestamp: "2:16 PM",
    },
    {
      text: "That's the one! How about Saturday morning?",
      isReceiver: false,
      timestamp: "2:17 PM",
    },
    {
      text: "Perfect! Let's meet there at 10:30? ☕️",
      isReceiver: true,
      timestamp: "2:18 PM",
    },
  ],
};

async function test() {
  try {
    console.log("Sending request to generate image...");
    const response = await fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testMessage),
    });

    console.log("Got response...");
    const result = await response.json();

    if (!result.success) {
      throw new Error(`Failed to generate image: ${result.error}`);
    }

    console.log("\nImage generated successfully!");
    console.log(`File: ${result.message}`);
    console.log(`Size: ${result.size} bytes`);
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log("Starting test...");
test();
