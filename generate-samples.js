import fetch from "node-fetch";

const conversations = [
  {
    title: "Coffee Plans",
    messages: [
      {
        text: "Hey! Are you free this weekend?",
        isReceiver: false,
        timestamp: "2:14 PM",
      },
      { text: "Yeah, what's up? 😊", isReceiver: true, timestamp: "2:15 PM" },
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
  },
  {
    title: "Movie Night",
    messages: [
      {
        text: "Have you seen the new Marvel movie yet?",
        isReceiver: false,
        timestamp: "7:30 PM",
      },
      {
        text: "Not yet! Been wanting to though",
        isReceiver: true,
        timestamp: "7:32 PM",
      },
      {
        text: "Want to go this weekend? I heard it's amazing",
        isReceiver: false,
        timestamp: "7:33 PM",
      },
      {
        text: "Yes! 🎬 When were you thinking?",
        isReceiver: true,
        timestamp: "7:34 PM",
      },
      {
        text: "Saturday evening? There's a 7pm showing",
        isReceiver: false,
        timestamp: "7:35 PM",
      },
      {
        text: "Perfect! Should we grab dinner before?",
        isReceiver: true,
        timestamp: "7:36 PM",
      },
      {
        text: "Definitely! That new pizza place?",
        isReceiver: false,
        timestamp: "7:37 PM",
      },
      { text: "You read my mind! 🍕", isReceiver: true, timestamp: "7:38 PM" },
    ],
  },
  {
    title: "Birthday Planning",
    messages: [
      {
        text: "Hey! Don't forget about Sarah's surprise party tomorrow!",
        isReceiver: false,
        timestamp: "1:15 PM",
      },
      {
        text: "Of course! What time should I be there?",
        isReceiver: true,
        timestamp: "1:17 PM",
      },
      {
        text: "Come at 6:30, she's arriving at 7",
        isReceiver: false,
        timestamp: "1:18 PM",
      },
      {
        text: "Got it! I'll bring the cake 🎂",
        isReceiver: true,
        timestamp: "1:19 PM",
      },
      {
        text: "Perfect! I've got the decorations",
        isReceiver: false,
        timestamp: "1:20 PM",
      },
      {
        text: "This is going to be amazing! Can't wait to see her face 😄",
        isReceiver: true,
        timestamp: "1:21 PM",
      },
    ],
  },
  {
    title: "Travel Plans",
    messages: [
      {
        text: "Just booked my flight to NYC! ✈️",
        isReceiver: false,
        timestamp: "3:45 PM",
      },
      {
        text: "That's awesome! When are you going?",
        isReceiver: true,
        timestamp: "3:47 PM",
      },
      {
        text: "Next month, from the 15th to 20th",
        isReceiver: false,
        timestamp: "3:48 PM",
      },
      {
        text: "We should definitely meet up! I know all the best spots 🗽",
        isReceiver: true,
        timestamp: "3:50 PM",
      },
      {
        text: "Yes please! I need your local expertise 😄",
        isReceiver: false,
        timestamp: "3:51 PM",
      },
      {
        text: "I'll make a list of places to show you!",
        isReceiver: true,
        timestamp: "3:52 PM",
      },
    ],
  },
  {
    title: "Game Night",
    messages: [
      {
        text: "Up for game night this Friday? 🎮",
        isReceiver: false,
        timestamp: "5:20 PM",
      },
      { text: "Always! What time?", isReceiver: true, timestamp: "5:22 PM" },
      {
        text: "7:30? I got the new Mario Party",
        isReceiver: false,
        timestamp: "5:23 PM",
      },
      {
        text: "Perfect! I'll bring snacks 🍿",
        isReceiver: true,
        timestamp: "5:24 PM",
      },
      {
        text: "Awesome! Jake and Emma are coming too",
        isReceiver: false,
        timestamp: "5:25 PM",
      },
      {
        text: "It's gonna be epic! Can't wait 🎲",
        isReceiver: true,
        timestamp: "5:26 PM",
      },
    ],
  },
];

async function generateImage(conversation) {
  try {
    console.log(`\nGenerating image for: ${conversation.title}`);
    const response = await fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: conversation.title,
        messages: conversation.messages,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(`Failed to generate image: ${result.error}`);
    }

    console.log(`✓ Generated ${conversation.title}`);
    console.log(`  File: ${result.filename}`);
    console.log(`  Size: ${result.size} bytes`);
  } catch (error) {
    console.error(`✗ Error generating ${conversation.title}:`, error);
  }
}

async function generateAll() {
  console.log("Starting sample conversation generation...");
  console.log(`Will generate ${conversations.length} conversations`);

  for (const conversation of conversations) {
    await generateImage(conversation);
    // Add a small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\nAll conversations generated!");
}

generateAll().catch(console.error);
