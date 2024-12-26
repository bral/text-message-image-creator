import fetch from "node-fetch";

// Messages categorized by length and type
const MESSAGES = {
  single: ["k", "?", "!", "y", "n", "x", "👍", "❤️", "✅", "👋"],
  short: [
    "Hey! 😊",
    "What's up?",
    "Sure!",
    "On my way!",
    "Thanks!",
    "Sounds good!",
    "Perfect!",
    "Can't wait!",
    "Maybe later?",
    "How are you?",
    "Good morning!",
    "See you soon!",
    "Great idea!",
    "No problem!",
    "Miss you!",
    "Call me!",
    "Let's do it!",
    "Really? 😮",
    "Awesome! 🎉",
    "Got it! 👍",
  ],
  medium: [
    "Want to grab lunch at that new Italian place downtown?",
    "Just finished the project I was telling you about yesterday.",
    "Have you seen the new Marvel movie? It's really good!",
    "Planning to go hiking this weekend. Want to join?",
    "The meeting went well, got some good feedback on our proposal.",
    "Finally got around to trying that new coffee shop you recommended.",
    "Think I'll work from home tomorrow, got a lot to focus on.",
    "Did you get a chance to look at the document I sent?",
    "The weather's supposed to be nice this weekend. Any plans?",
    "Just booked my tickets for next month's conference! 🎫",
    "That new restaurant was amazing, we should go back sometime.",
    "Got some great news about the project, call me when you can!",
    "Found this cool new app for productivity, you might like it.",
    "Remember that book you recommended? Just started reading it.",
    "Finally got my new phone set up, much better than the old one!",
  ],
  long: [
    "Just finished a major project that I've been working on for the past three months. It was challenging but really rewarding to see everything come together in the end. The client was super happy with the results.",
    "Our team just implemented this new workflow system that's supposed to make everything more efficient. It's been a bit of an adjustment, but I think it's going to make a big difference in how we handle projects.",
    "Been researching different options for a tropical vacation. Looking at some less touristy islands in the Caribbean that still have beautiful beaches but are more authentic and less crowded.",
    "Just upgraded my entire home office setup with a new ultrawide monitor, mechanical keyboard, and ergonomic chair. It's made such a difference in my productivity and comfort throughout the day.",
    "Found this amazing travel program where you can work remotely while traveling to different cities around the world. They handle all the logistics and accommodation. Seriously considering applying.",
    "Have you been following all the developments in artificial intelligence lately? It's incredible how quickly things are advancing. I've been experimenting with some of the new tools and the capabilities are mind-blowing.",
    "I was thinking about trying that new restaurant downtown that everyone's been talking about. They supposedly have an amazing chef from Italy who specializes in traditional pasta dishes. Want to check it out?",
    "Just got back from that conference I was telling you about. Met so many interesting people and learned about some amazing new technologies. I've got so many ideas I want to try implementing at work.",
    "Finally finished setting up my smart home system. Got everything connected - lights, thermostat, security cameras, and even set up some automated routines. It's like living in the future!",
    "Been working on this side project for the past few weeks, building a custom app to help with task management. It's coming along really well, and I think it could be useful for our team.",
  ],
  lists: [
    "Shopping list:\n• Milk\n• Bread\n• Eggs\n• Coffee",
    "Todo today:\n• Team meeting at 10\n• Lunch with Sarah\n• Finish report\n• Gym",
    "Weekend plans:\n• Saturday brunch\n• Movie night\n• Grocery shopping\n• Clean apartment",
    "Project tasks:\n• Update documentation\n• Review PRs\n• Deploy changes\n• Send update",
    "Packing list:\n• Passport\n• Chargers\n• Toiletries\n• Clothes",
    "Meeting agenda:\n• Project updates\n• Timeline review\n• Budget discussion\n• Next steps",
    "Gift ideas:\n• Books\n• Headphones\n• Gift card\n• Plants",
    "Movie options:\n• The Batman\n• Top Gun\n• Black Panther\n• Avatar",
    "Dinner menu:\n• Salad\n• Pasta\n• Garlic bread\n• Tiramisu",
    "Travel checklist:\n• Book flights\n• Reserve hotel\n• Get insurance\n• Pack bags",
  ],
};

const THEMES = ["iOS", "dark", "android", "androidDark"];

// Extended list of common phone resolutions
const RESOLUTIONS = [
  // Standard resolutions
  { width: 360, height: 640, scale: 2 }, // Samsung Galaxy S7
  { width: 375, height: 667, scale: 2 }, // iPhone 8
  { width: 390, height: 844, scale: 3 }, // iPhone 12/13 Pro
  { width: 393, height: 873, scale: 3 }, // Pixel 7
  { width: 412, height: 915, scale: 2.6 }, // Samsung Galaxy S22
  { width: 428, height: 926, scale: 3 }, // iPhone 12/13 Pro Max
  { width: 360, height: 780, scale: 3 }, // Samsung Galaxy S20
  { width: 384, height: 854, scale: 3 }, // OnePlus 9
  { width: 411, height: 731, scale: 2.6 }, // Pixel 6
  { width: 414, height: 896, scale: 2 }, // iPhone 11
  { width: 412, height: 892, scale: 3.5 }, // Samsung Galaxy S21
  { width: 360, height: 800, scale: 3 }, // Samsung Galaxy A series

  // Taller aspect ratios
  { width: 360, height: 800, scale: 3 }, // Modern mid-range Android
  { width: 412, height: 919, scale: 3.5 }, // Samsung Galaxy S23
  { width: 430, height: 932, scale: 3 }, // iPhone 14 Pro Max

  // Compact phones
  { width: 360, height: 640, scale: 2 }, // Compact Android
  { width: 375, height: 667, scale: 2 }, // iPhone SE

  // Larger phones
  { width: 428, height: 926, scale: 3 }, // Large flagship
  { width: 450, height: 950, scale: 3 }, // Extra large devices
];

// Font sizes to simulate different system settings
const FONT_SIZES = [
  { size: 14, lineHeight: 1.3 }, // Small
  { size: 16, lineHeight: 1.35 }, // Default -1
  { size: 17, lineHeight: 1.4 }, // Default
  { size: 18, lineHeight: 1.45 }, // Default +1
  { size: 20, lineHeight: 1.5 }, // Large
  { size: 22, lineHeight: 1.55 }, // Larger
];

const EMOJIS = [
  "😊",
  "👍",
  "🙌",
  "💯",
  "🎉",
  "👏",
  "❤️",
  "😄",
  "🤔",
  "😎",
  "🙂",
  "✨",
  "🎬",
  "🍿",
  "🍕",
  "☕️",
  "🎮",
  "🎯",
  "🎲",
  "🎸",
];

// Add random emoji with 30% probability
function maybeAddEmoji(text) {
  if (Math.random() < 0.3) {
    return `${text} ${EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}`;
  }
  return text;
}

// Get random message of specified length
function getRandomMessage(length) {
  const messages = MESSAGES[length];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Get random length with weighted distribution
function getRandomLength() {
  const weights = {
    single: 0.1, // 10% chance
    short: 0.3, // 30% chance
    medium: 0.3, // 30% chance
    long: 0.15, // 15% chance
    lists: 0.15, // 15% chance
  };

  const rand = Math.random();
  if (rand < weights.single) return "single";
  if (rand < weights.single + weights.short) return "short";
  if (rand < weights.single + weights.short + weights.medium) return "medium";
  if (rand < weights.single + weights.short + weights.medium + weights.long)
    return "long";
  return "lists";
}

// Generate a random conversation with varied message lengths
function generateConversation() {
  const messageCount = Math.floor(Math.random() * 8) + 5; // 5-12 messages
  const messages = [];
  let currentSender = Math.random() < 0.5; // randomly choose who starts

  // Function to add a burst of messages from one sender
  const addMessageBurst = (isReceiver, count) => {
    for (let i = 0; i < count; i++) {
      const length = getRandomLength();
      const text = getRandomMessage(length);
      messages.push({
        text: maybeAddEmoji(text),
        isReceiver,
      });
    }
  };

  // Generate messages with bursts
  while (messages.length < messageCount) {
    const burstSize =
      Math.random() < 0.3
        ? Math.floor(Math.random() * 3) + 2 // 2-4 messages in a burst
        : 1; // single message

    if (messages.length + burstSize > messageCount) {
      // Add remaining messages one by one
      addMessageBurst(currentSender, 1);
    } else {
      // Add a burst of messages
      addMessageBurst(currentSender, burstSize);
    }

    // Switch sender with 80% probability after a burst
    if (Math.random() < 0.8) {
      currentSender = !currentSender;
    }
  }

  return messages;
}

async function generateImage(messages, index, maxRetries = 3) {
  const backoffDelay = (attempt) =>
    Math.min(1000 * Math.pow(2, attempt), 10000);

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Randomly select theme and resolution
      const theme = THEMES[Math.floor(Math.random() * THEMES.length)];
      const resolution = RESOLUTIONS[index % RESOLUTIONS.length];
      const fontSize =
        FONT_SIZES[Math.floor(Math.random() * FONT_SIZES.length)];
      // Alternate between png and jpeg
      const format = index % 2 === 0 ? "png" : "jpeg";

      console.log(
        `\nGenerating conversation ${index + 1} (attempt ${
          attempt + 1
        }/${maxRetries})`
      );
      console.log(
        `Theme: ${theme}, Format: ${format}, Resolution: ${resolution.width}x${resolution.height}@${resolution.scale}x`
      );
      console.log(
        `Font size: ${fontSize.size}px, Line height: ${fontSize.lineHeight}`
      );

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch("http://localhost:3000/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `conversation-${index + 1}`,
            messages,
            theme,
            format,
            resolution,
            fontSize,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(`Failed to generate image: ${result.error}`);
        }

        console.log(`✓ Generated conversation ${index + 1}`);
        console.log(`  File: ${result.filename}`);
        return { success: true, index };
      } catch (error) {
        clearTimeout(timeout);
        throw error;
      }
    } catch (error) {
      console.error(
        `✗ Error generating conversation ${index + 1} (attempt ${
          attempt + 1
        }):`,
        error
      );

      // If this was our last attempt, or if it's not a connection error, give up
      if (
        attempt === maxRetries - 1 ||
        (error.code !== "ECONNREFUSED" && error.code !== "ECONNRESET")
      ) {
        return { success: false, index, error };
      }

      // Wait before retrying with exponential backoff
      const delay = backoffDelay(attempt);
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function generateRandomConversations(count = 150) {
  console.log(`Generating ${count} random conversations...`);

  // Process in batches of 8 concurrent requests
  const BATCH_SIZE = 8;
  const results = {
    success: 0,
    failed: 0,
    total: count,
  };

  for (let i = 0; i < count; i += BATCH_SIZE) {
    const batchPromises = [];
    const batchEnd = Math.min(i + BATCH_SIZE, count);

    console.log(
      `\nProcessing batch ${i / BATCH_SIZE + 1} (conversations ${
        i + 1
      }-${batchEnd})`
    );

    for (let j = i; j < batchEnd; j++) {
      const conversation = generateConversation();
      batchPromises.push(generateImage(conversation, j));
    }

    const batchResults = await Promise.all(batchPromises);

    // Update statistics
    const batchStats = batchResults.reduce(
      (stats, result) => {
        result.success ? stats.success++ : stats.failed++;
        return stats;
      },
      { success: 0, failed: 0 }
    );

    results.success += batchStats.success;
    results.failed += batchStats.failed;

    // Log batch results
    console.log(`\nBatch ${i / BATCH_SIZE + 1} complete:`);
    console.log(`Success: ${batchStats.success}, Failed: ${batchStats.failed}`);
    console.log(
      `Overall progress: ${results.success + results.failed}/${count} (${
        results.success
      } successful, ${results.failed} failed)`
    );

    // Add delay between batches to prevent overwhelming the server
    if (i + BATCH_SIZE < count) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("\nAll conversations generated!");
  console.log(
    `Final results: ${results.success} successful, ${results.failed} failed`
  );
}

// Generate 150 random conversations
generateRandomConversations(150).catch(console.error);
