# Text Message Image Creator

Generate realistic Android Messages-style conversation images for ML training data.

## Features

- Authentic Android Messages styling
- Multiple screen resolutions
- Font size variations
- Various message types (single chars, short/medium/long messages, bullet lists)
- Support for PNG and JPEG output
- Light/Dark theme support

## Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/text-message-image-creator.git
cd text-message-image-creator
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

## Usage

### Starting the Server

```bash
node server.js
```

The server will start on port 3000.

### Generating Images

There are several scripts available for generating images:

1. Generate a random dataset (150 images):

```bash
node generate-random.js
```

2. Generate specific test cases:

```bash
node test-styling.js
```

### Configuration Options

The generator supports various options:

#### Screen Resolutions

- Standard: 375x667 @2x
- High: 390x844 @3x
- Ultra: 428x926 @3x
- Plus 16 other common device sizes

#### Font Sizes

- Small: 14px / 1.3
- Default -1: 16px / 1.35
- Default: 17px / 1.4
- Default +1: 18px / 1.45
- Large: 20px / 1.5
- Larger: 22px / 1.55

#### Message Types

- Single characters (10%)
- Short messages (30%)
- Medium messages (30%)
- Long messages (15%)
- Bullet lists (15%)

#### Themes

- iOS (light)
- iOS (dark)
- Android (light)
- Android (dark)

## API Endpoints

### POST /generate-image

Generate a single conversation image.

Request body:

```json
{
  "messages": [
    {
      "text": "Hey! How are you?",
      "isReceiver": false
    },
    {
      "text": "I'm good, thanks!",
      "isReceiver": true
    }
  ],
  "theme": "android",
  "format": "png",
  "resolution": {
    "width": 375,
    "height": 667,
    "scale": 2
  },
  "fontSize": {
    "size": 17,
    "lineHeight": 1.4
  }
}
```

Response:

```json
{
  "success": true,
  "message": "Image generated and saved as output/conversation-1-android.png",
  "size": 123456,
  "filename": "output/conversation-1-android.png"
}
```

## Output

Generated images are saved in the `output` directory with filenames following the pattern:

```
conversation-{index}-{theme}.{format}
```

Example: `conversation-1-android.png`

## Dataset Characteristics

The generated dataset includes:

1. Message Types & Distribution:

   - Single chars (10%): Letters, punctuation, single emojis
   - Short messages (30%): 1-3 words
   - Medium messages (30%): 1-2 sentences
   - Long messages (15%): 3+ sentences
   - Bullet lists (15%): Shopping lists, todos, agendas

2. Font Size Variations:

   - 6 different sizes from 14px to 22px
   - Corresponding line heights from 1.3 to 1.55

3. Screen Resolutions:

   - 19 different device sizes
   - Scale factors from @2x to @3.5x
   - Various aspect ratios

4. Styling:
   - Exact Android Messages green (#00D856)
   - Dark gray (#303030) for received messages
   - Black background (#000)
   - 24px border radius
   - Authentic padding and spacing

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this for your ML training needs!
