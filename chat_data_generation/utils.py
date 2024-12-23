#!/usr/bin/env python3
"""
Utility functions for chat image generation.
"""


def get_color_palette():
    """
    Get a list of realistic chat bubble colors.

    Returns:
        list: List of RGB tuples representing chat colors (white, grey, green, blue, purple)
    """
    return [
        (255, 255, 255),  # White
        (229, 229, 234),  # Light Grey
        (50, 200, 100),   # Green
        (0, 122, 255),    # Blue
        (88, 86, 214)     # Purple
    ]


def get_font_list():
    """
    Get a list of common system fonts.

    Returns:
        list: List of font names/paths
    """
    return [
        "Arial",
        "Helvetica",
        "SF Pro",
        "Roboto",
        "Segoe UI"
    ]


def get_shape_variations():
    """
    Get variations of chat bubble shapes.

    Returns:
        list: List of dictionaries containing shape parameters
    """
    return [
        {
            "corner_radius": 20,
            "tail_width": 15,
            "tail_height": 10
        },
        {
            "corner_radius": 15,
            "tail_width": 12,
            "tail_height": 8
        },
        {
            "corner_radius": 25,
            "tail_width": 18,
            "tail_height": 12
        }
    ]


if __name__ == "__main__":
    # Test code will be added here
    pass
