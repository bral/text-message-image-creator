#!/usr/bin/env python3
"""
Visual test script for chat bubble rendering.
"""

from PIL import ImageFont
from chat_data_generation.image_manipulator import create_chat_bubble
from chat_data_generation.text_generator import generate_random_text


def test_bubble_styles():
    """Generate sample chat bubbles with different styles."""
    # Test different tail directions
    messages = [
        ("Hello! How are you today?", "right", (0, 122, 255)),  # Blue, right tail
        ("I'm doing great, thanks!", "left", (229, 229, 234)),  # Grey, left tail
        ("That's wonderful to hear!", "right",
         (50, 200, 100)),  # Green, right tail
        ("Short msg", "none", (255, 255, 255)),  # White, no tail
    ]

    font = ImageFont.load_default()
    shape = {"corner_radius": 20, "tail_width": 15, "tail_height": 10}

    # Generate and save each bubble
    for i, (text, direction, color) in enumerate(messages):
        bubble = create_chat_bubble(
            text,
            color,
            font,
            (300, 100),
            shape,
            direction
        )
        bubble.save(f"chat_data_generation/output/test_bubble_{i+1}.png")
        print(f"Generated test_bubble_{i+1}.png")

    # Test a long message
    long_text = generate_random_text(100, 150)
    long_bubble = create_chat_bubble(
        long_text,
        (0, 122, 255),
        font,
        (400, 150),
        shape,
        "right"
    )
    long_bubble.save("chat_data_generation/output/test_bubble_long.png")
    print("Generated test_bubble_long.png")


if __name__ == "__main__":
    test_bubble_styles()
