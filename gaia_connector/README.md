# Gaia Connector

## Introduction
Handling user commands must be synchronous; therefore, tasks such as receiving and ensuring the immediate processing of user requests are prioritized. Meanwhile, Gaia Connector serves as a dedicated service for managing user operations and acts as a bridge for Gaia to connect with other services, such as scheduling or task creation.


## What's New

+  [2024.01.04] Release Gaia Connector V2.0.0!

### Overview

Gaia Bot serves as an command-line interface to connect numerous AI models and services for solving complicated AI tasks!

<p align="center">
<img width="100%" alt="image" src="https://github.com/user-attachments/assets/9a6a3d6f-7445-4138-a1ed-4af6136d4f45">    
</p>

### System Requirements

#### Default (Recommended)

+ Ubuntu 16.04 LTS
+ VRAM >= 8GB
+ RAM > 8GB (minimal), 16GB (standard)

### Setup and Installation
```bash
# setup env
conda activate gaia_bot
pip install -r requirements.txt
# All of instruction would be in Makefile
make run
```
