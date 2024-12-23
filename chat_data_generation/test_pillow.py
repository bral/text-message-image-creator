#!/usr/bin/env python3
"""
Test script to verify Pillow installation and basic functionality.
"""

from PIL import Image, ImageDraw, ImageFont
import os


def test_pillow():
    """Create a simple test image to verify Pillow functionality."""
    # Create a new image with a white background
    img = Image.new('RGB', (300, 100), color='white')

    # Create a drawing context
    draw = ImageDraw.Draw(img)

    # Draw some text
    draw.text((10, 40), "Pillow Test Successful!", fill='black')

    # Save the test image
    output_path = os.path.join(os.path.dirname(__file__), 'output', 'test.png')
    img.save(output_path)
    print(f"Test image saved to: {output_path}")


if __name__ == "__main__":
    test_pillow()
