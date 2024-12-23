"""
Module for creating and manipulating chat bubble images.
"""

from PIL import Image, ImageDraw, ImageFont
from typing import Tuple, Dict, Union, Optional
import math
import os


def create_rounded_rectangle(
    draw: ImageDraw,
    xy: Tuple[int, int, int, int],
    radius: int,
    fill: Union[str, Tuple[int, int, int]],
) -> None:
    """
    Draw a rounded rectangle on the image.

    Args:
        draw: ImageDraw object
        xy: Tuple of (left, top, right, bottom) coordinates
        radius: Corner radius
        fill: Fill color (RGB tuple or string)
    """
    upper_left = (xy[0], xy[1])
    upper_right = (xy[2], xy[1])
    lower_left = (xy[0], xy[3])
    lower_right = (xy[2], xy[3])

    # Draw rectangles for the main body
    draw.rectangle(
        [upper_left[0], upper_left[1] + radius,
         lower_right[0], lower_right[1] - radius],
        fill=fill
    )
    draw.rectangle(
        [upper_left[0] + radius, upper_left[1],
         lower_right[0] - radius, lower_right[1]],
        fill=fill
    )

    # Draw circles for corners with larger radius
    draw.ellipse([upper_left[0], upper_left[1],
                  upper_left[0] + radius * 2, upper_left[1] + radius * 2],
                 fill=fill)  # Upper left
    draw.ellipse([upper_right[0] - radius * 2, upper_right[1],
                  upper_right[0], upper_right[1] + radius * 2],
                 fill=fill)  # Upper right
    draw.ellipse([lower_left[0], lower_left[1] - radius * 2,
                  lower_left[0] + radius * 2, lower_left[1]],
                 fill=fill)  # Lower left
    draw.ellipse([lower_right[0] - radius * 2, lower_right[1] - radius * 2,
                  lower_right[0], lower_right[1]],
                 fill=fill)  # Lower right


def get_system_font(size: int = 26) -> ImageFont.FreeTypeFont:
    """Get the best available system font for iMessage style."""
    # List of font paths to try, in order of preference
    font_paths = [
        # macOS system fonts
        "/System/Library/Fonts/SFPro.ttf",
        "/System/Library/Fonts/SFProDisplay-Regular.otf",
        "/Library/Fonts/SF-Pro-Display-Regular.otf",
        # Common system fonts
        "Arial.ttf",
        # Add more fallbacks as needed
    ]

    for font_path in font_paths:
        try:
            return ImageFont.truetype(font_path, size)
        except OSError:
            continue

    return ImageFont.load_default()


def create_chat_bubble(
    text: str,
    color: Union[str, Tuple[int, int, int]] = (
        11, 132, 255),  # Perfect iMessage blue
    font: Union[str, ImageFont.FreeTypeFont] = None,
    size: Optional[Tuple[int, int]] = None,
    shape: Optional[Dict[str, int]] = None,
    tail_direction: str = "right"
) -> Image.Image:
    """
    Create a chat bubble with the specified parameters.

    Args:
        text: Text to display in the bubble
        color: RGB color tuple or color string for the bubble (default: iMessage blue)
        font: Font path/name or ImageFont object (default: system font)
        size: (width, height) of the bubble (optional, calculated from text if None)
        shape: Parameters for bubble shape (corner_radius, tail_width, tail_height)
        tail_direction: Direction of chat bubble tail ('left', 'right', 'none')

    Returns:
        PIL Image object containing the rendered chat bubble

    Raises:
        ValueError: If invalid parameters are provided
    """
    # Use system font if none provided
    if font is None:
        font = get_system_font(26)  # Increased font size
    elif isinstance(font, str):
        try:
            font = ImageFont.truetype(font, 26)
        except OSError:
            font = get_system_font(26)

    # Validate parameters
    if tail_direction not in ['left', 'right', 'none']:
        raise ValueError("tail_direction must be 'left', 'right', or 'none'")

    # Calculate text size with precise padding
    padding_x = 24  # Horizontal padding
    padding_y = 22  # Slightly reduced vertical padding
    text_bbox = font.getbbox(text)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    # Calculate bubble dimensions
    if size is None:
        bubble_width = text_width + (padding_x * 2)
        bubble_height = text_height + (padding_y * 2)
    else:
        bubble_width = max(text_width + padding_x * 2, size[0])
        bubble_height = max(text_height + padding_y * 2, size[1])

    # Ensure minimum height and adjust for perfect corner radius
    min_height = 58  # Adjusted minimum height
    bubble_height = max(bubble_height, min_height)
    corner_radius = bubble_height // 2  # Corner radius exactly half the height

    # Create image with extra space for tail
    tail_width = 12  # Slightly thinner tail
    tail_height = 14  # Slightly shorter tail
    img_width = bubble_width + tail_width
    img_height = bubble_height
    img = Image.new('RGBA', (img_width, img_height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Calculate bubble position
    if tail_direction == 'right':
        bubble_x = 0
    else:  # left or none
        bubble_x = tail_width if tail_direction == 'left' else 0

    # Draw main bubble
    create_rounded_rectangle(
        draw,
        (bubble_x, 0, bubble_x + bubble_width, bubble_height),
        corner_radius,
        color
    )

    # Draw tail with precise positioning
    if tail_direction != 'none':
        tail_points = []
        tail_y = bubble_height * 0.62  # Positioned slightly higher
        if tail_direction == 'left':
            tail_points = [
                (bubble_x, tail_y),
                (0, tail_y + tail_height // 2),
                (bubble_x, tail_y + tail_height)
            ]
        else:  # right
            tail_points = [
                (bubble_x + bubble_width, tail_y),
                (img_width, tail_y + tail_height // 2),
                (bubble_x + bubble_width, tail_y + tail_height)
            ]
        draw.polygon(tail_points, fill=color)

    # Draw text in white with precise positioning
    text_x = bubble_x + (bubble_width - text_width) // 2
    text_y = (bubble_height - text_height) // 2
    draw.text((text_x, text_y), text, font=font, fill='white')

    return img


def create_chat_image(
    bubbles: list,
    background_color: Union[str, Tuple[int, int, int]],
    include_keyboard: bool = False,
    include_top_bar: bool = False
) -> Image.Image:
    """
    Create a complete chat image with multiple bubbles.

    Args:
        bubbles: List of (text, color, alignment) tuples
        background_color: RGB color tuple or color string for background
        include_keyboard: Whether to include keyboard at bottom
        include_top_bar: Whether to include status bar at top

    Returns:
        PIL Image object containing the complete chat image
    """
    # This will be implemented in Task 4
    pass


if __name__ == "__main__":
    # Test code
    test_bubble = create_chat_bubble(
        "Oh hell yeah, you're a beast in kitchen",
        (11, 132, 255),  # Perfect iMessage blue
        None,  # Use system font
        None,  # Auto-size based on text
        None,  # Use default shape parameters
        "right"
    )
    test_bubble.save("chat_data_generation/output/test_bubble.png")
