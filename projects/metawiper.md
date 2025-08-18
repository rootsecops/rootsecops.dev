---
title: "MetaWiper"
date: "2024-07-20"
description: "A Bash script for Linux systems to securely wipe metadata from various file types, enhancing user privacy and data security."
image: "https://raw.githubusercontent.com/rootsecops/metawiper/refs/heads/main/assests/metawiper.streamlit.app.jpeg"
imageHint: "code security"
tags: ["Bash", "Shell", "Security", "Privacy", "Metadata"]
githubLink: "https://github.com/rootsecops/metawiper"
demoLink: "https://metawiper.streamlit.app/"
---

MetaWiper is a command-line tool designed to protect user privacy by removing potentially sensitive metadata from files. 

### Why is this important?

Many file types, especially images and documents, contain hidden data (EXIF, etc.) that can reveal information like GPS coordinates, camera model, software used, and timestamps. This script provides a simple way to scrub this data before sharing files online.

### Features:
- Supports a wide range of file types including images, videos, and documents.
- Uses industry-standard tools like `exiftool` to ensure thorough metadata removal.
- Simple and easy to use from any Linux terminal.
