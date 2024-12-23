#!/usr/bin/env python3
"""
Unit tests for the text generator module.
"""

import pytest
from chat_data_generation.text_generator import generate_random_text


def test_length_constraints():
    """Test that generated text respects length constraints."""
    min_len, max_len = 20, 50
    text = generate_random_text(min_len, max_len)
    assert min_len <= len(text) <= max_len


def test_multiple_generations():
    """Test multiple generations to ensure variety."""
    min_len, max_len = 10, 30
    texts = [generate_random_text(min_len, max_len) for _ in range(5)]
    # Check that we get different texts (very low probability of duplicates)
    assert len(set(texts)) > 1


def test_invalid_lengths():
    """Test error handling for invalid length parameters."""
    with pytest.raises(ValueError):
        generate_random_text(-1, 10)
    with pytest.raises(ValueError):
        generate_random_text(20, 10)


def test_punctuation():
    """Test that generated text ends with proper punctuation."""
    text = generate_random_text(10, 30)
    assert text[-1] in '.!?'


def test_minimum_length():
    """Test very short text generation."""
    min_len, max_len = 5, 10
    text = generate_random_text(min_len, max_len)
    assert len(text) >= min_len


def test_maximum_length():
    """Test that text doesn't exceed maximum length."""
    min_len, max_len = 10, 15
    text = generate_random_text(min_len, max_len)
    assert len(text) <= max_len


if __name__ == "__main__":
    pytest.main([__file__])
