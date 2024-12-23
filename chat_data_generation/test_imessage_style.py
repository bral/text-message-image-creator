#!/usr/bin/env python3
"""
Test script to generate iMessage-style chat bubbles.
"""

from PIL import Image
from chat_data_generation.image_manipulator import create_chat_bubble


def test_imessage_style():
    """Generate chat bubbles matching the iMessage style."""

    # Test case 1: Exact reference message
    reference_bubble = create_chat_bubble(
        "Oh hell yeah, you're a beast in kitchen",
        (0, 132, 255),  # Refined iMessage blue
        None,  # Use system font
        None,  # Auto-size based on text
        None,  # Use default shape parameters
        "right"
    )
    reference_bubble.save("chat_data_generation/output/imessage_reference.png")
    print("Generated imessage_reference.png")

    # Test case 2: Short message
    short_bubble = create_chat_bubble(
        "Thanks!",
        (0, 132, 255),
        None,
        None,
        None,
        "right"
    )
    short_bubble.save("chat_data_generation/output/imessage_short.png")
    print("Generated imessage_short.png")

    # Test case 3: Long message
    long_bubble = create_chat_bubble(
        "This is a much longer message to test how the bubble handles multiple lines of text while maintaining the iMessage style",
        (0, 132, 255),
        None,
        None,
        None,
        "right"
    )
    long_bubble.save("chat_data_generation/output/imessage_long.png")
    print("Generated imessage_long.png")

    # Test case 4: Left-aligned bubble
    left_bubble = create_chat_bubble(
        "How about this one?",
        (229, 229, 234),  # iMessage gray
        None,
        None,
        None,
        "left"
    )
    left_bubble.save("chat_data_generation/output/imessage_left.png")
    print("Generated imessage_left.png")

    # Create a combined image showing all bubbles
    # Calculate total height needed
    padding = 20
    total_height = (padding * 5 +
                    reference_bubble.height +
                    short_bubble.height +
                    long_bubble.height +
                    left_bubble.height)
    max_width = max(reference_bubble.width,
                    short_bubble.width,
                    long_bubble.width,
                    left_bubble.width) + padding * 2

    # Create combined image
    combined = Image.new('RGBA', (max_width, total_height), (0, 0, 0, 0))
    y_offset = padding

    # Paste all bubbles
    for bubble in [reference_bubble, short_bubble, long_bubble, left_bubble]:
        x_offset = padding
        combined.paste(bubble, (x_offset, y_offset), bubble)
        y_offset += bubble.height + padding

    combined.save("chat_data_generation/output/imessage_samples.png")
    print("Generated imessage_samples.png")


if __name__ == "__main__":
    test_imessage_style()
