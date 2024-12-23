import fetch from "node-fetch";

const conversations = [
  {
    title: "ios-test",
    theme: "iOS",
    messages: [
      { text: "Hey! How's it going?", isReceiver: false },
      { text: "Pretty good! Just got back from lunch 🍕", isReceiver: true },
      { text: "Nice! Where did you go?", isReceiver: false },
      { text: "That new Italian place downtown", isReceiver: true },
      { text: "Oh I've been wanting to try that!", isReceiver: false },
      { text: "It's really good! We should go sometime", isReceiver: true },
      { text: "Definitely! How about next week?", isReceiver: false },
    ],
  },
  {
    title: "android-test",
    theme: "android",
    messages: [
      { text: "Movie tonight? 🎬", isReceiver: false },
      { text: "Sure! What's playing?", isReceiver: true },
      { text: "The new Marvel movie just came out", isReceiver: false },
      { text: "Perfect timing!", isReceiver: true },
      { text: "I heard it's really good", isReceiver: true },
      { text: "There's a showing at 7:30", isReceiver: false },
      { text: "Want to grab dinner before?", isReceiver: true },
    ],
  },
  {
    title: "dark-test",
    theme: "dark",
    messages: [
      { text: "Did you finish the presentation?", isReceiver: false },
      { text: "Just about! Adding final touches", isReceiver: true },
      { text: "Need any help with it?", isReceiver: false },
      { text: "Actually yes!", isReceiver: true },
      { text: "Could you look over the slides?", isReceiver: true },
      { text: "Of course! Send them over 👍", isReceiver: false },
      { text: "Thanks! You're the best 🙌", isReceiver: true },
    ],
  },
];

async function generateImage(conversation) {
  try {
    console.log(`\nGenerating ${conversation.theme} example...`);
    const response = await fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: conversation.title,
        messages: conversation.messages,
        theme: conversation.theme,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(`Failed to generate image: ${result.error}`);
    }

    console.log(`✓ Generated ${conversation.theme} example`);
    console.log(`  File: ${result.filename}`);
  } catch (error) {
    console.error(`✗ Error generating ${conversation.theme} example:`, error);
  }
}

async function generateExamples() {
  console.log("Generating styling test examples...");

  for (const conversation of conversations) {
    await generateImage(conversation);
    // Add a small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\nAll examples generated!");
}

generateExamples().catch(console.error);
