"""
Unit tests for the image manipulator module.
"""

import pytest
from PIL import Image, ImageFont
from chat_data_generation.image_manipulator import create_chat_bubble


def test_basic_bubble_creation():
    """Test basic chat bubble creation."""
    bubble = create_chat_bubble(
        "Test message",
        (200, 200, 200),
        ImageFont.load_default(),
        (200, 100),
        {"corner_radius": 20, "tail_width": 15, "tail_height": 10},
        "right"
    )
    assert isinstance(bubble, Image.Image)
    assert bubble.mode == 'RGBA'
    assert bubble.size[0] > 0 and bubble.size[1] > 0


def test_tail_directions():
    """Test different tail directions."""
    directions = ['left', 'right', 'none']
    for direction in directions:
        bubble = create_chat_bubble(
            "Test",
            (200, 200, 200),
            ImageFont.load_default(),
            (150, 80),
            {"corner_radius": 20, "tail_width": 15, "tail_height": 10},
            direction
        )
        assert isinstance(bubble, Image.Image)


def test_invalid_tail_direction():
    """Test error handling for invalid tail direction."""
    with pytest.raises(ValueError):
        create_chat_bubble(
            "Test",
            (200, 200, 200),
            ImageFont.load_default(),
            (150, 80),
            {"corner_radius": 20},
            "invalid_direction"
        )


def test_different_sizes():
    """Test various bubble sizes."""
    sizes = [(100, 50), (200, 100), (300, 150)]
    for size in sizes:
        bubble = create_chat_bubble(
            "Test message",
            (200, 200, 200),
            ImageFont.load_default(),
            size,
            {"corner_radius": 20, "tail_width": 15, "tail_height": 10},
            "right"
        )
        assert isinstance(bubble, Image.Image)
        assert bubble.size[0] > 0 and bubble.size[1] > 0


def test_color_formats():
    """Test different color formats."""
    colors = [
        (200, 200, 200),  # RGB tuple
        'rgb(200,200,200)',  # RGB string
        '#C8C8C8',  # Hex string
    ]
    for color in colors:
        bubble = create_chat_bubble(
            "Test",
            color,
            ImageFont.load_default(),
            (150, 80),
            {"corner_radius": 20, "tail_width": 15, "tail_height": 10},
            "right"
        )
        assert isinstance(bubble, Image.Image)


def test_long_text():
    """Test bubble creation with long text."""
    long_text = "This is a very long message that should be properly handled " \
                "by the chat bubble creation function without any issues."
    bubble = create_chat_bubble(
        long_text,
        (200, 200, 200),
        ImageFont.load_default(),
        (300, 150),
        {"corner_radius": 20, "tail_width": 15, "tail_height": 10},
        "right"
    )
    assert isinstance(bubble, Image.Image)
    assert bubble.size[0] > 0 and bubble.size[1] > 0


if __name__ == "__main__":
    pytest.main([__file__])
