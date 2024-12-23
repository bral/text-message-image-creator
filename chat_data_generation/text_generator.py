"""
Module for generating random text strings for chat messages.
"""

from faker import Faker
import random

__all__ = ['generate_random_text', 'generate_emoji']

fake = Faker()


def generate_random_text(min_length: int, max_length: int) -> str:
    """
    Generate a random string of English words within the specified length range.

    Args:
        min_length (int): Minimum length of the generated text
        max_length (int): Maximum length of the generated text

    Returns:
        str: Generated text string

    Raises:
        ValueError: If min_length is less than 1 or max_length is less than min_length
    """
    if min_length < 1:
        raise ValueError("min_length must be at least 1")
    if max_length < min_length:
        raise ValueError(
            "max_length must be greater than or equal to min_length")

    # Generate a base sentence
    text = fake.sentence().rstrip('.')

    # Add more words if needed to reach minimum length
    while len(text) < min_length:
        # Randomly decide to add a new sentence or continue the current one
        if random.random() < 0.3 and len(text) + 2 < max_length:  # 30% chance for new sentence
            text += '. ' + fake.sentence().rstrip('.')
        else:
            text += ' ' + fake.word()

    # Trim if exceeds max length while preserving word boundaries
    if len(text) > max_length:
        words = text[:max_length+1].split()
        text = ' '.join(words[:-1])

    # Add final punctuation
    if random.random() < 0.2:  # 20% chance for question
        text += '?'
    elif random.random() < 0.1:  # 10% chance for exclamation
        text += '!'
    else:  # 70% chance for period
        text += '.'

    return text


def generate_emoji() -> str:
    """
    Generate a random emoji-like text representation.

    Returns:
        str: A random emoji or empty string (80% chance for no emoji)
    """
    emojis = ['😊', '👍', '❤️', '😂', '🙌', '👋', '🎉', '🤔', '👀', '🙏']
    return random.choice(emojis) if random.random() < 0.2 else ''


if __name__ == "__main__":
    # Test the function with various lengths
    test_cases = [
        (10, 30),
        (50, 100),
        (20, 40),
    ]

    print("Testing text generation:")
    for min_len, max_len in test_cases:
        text = generate_random_text(min_len, max_len)
        print(f"\nRange ({min_len}, {max_len}):")
        print(f"Generated text ({len(text)} chars): {text}")
        if random.random() < 0.3:  # 30% chance to add emoji in test
            print(f"With emoji: {text} {generate_emoji()}")
