from setuptools import setup, find_packages

setup(
    name="chat_data_generation",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'Pillow',
        'faker',
        'pytest',
    ],
)
