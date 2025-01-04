# GaiaBot - CLI Task Management Bot

## Introduction
GaiaBot is a powerful command-line interface (CLI) application that allows users to manage tasks locally. GaiaBot is a powerful command line interface (CLI) application that allows users to manage tasks locally. Besides, you can choose various options to customize Gaia such as voice chat, running without internet, etc.

## What's New

+  [2024.01.04] Release Gaia V2.0.0!

### Overview

Gaia Bot serves as an command-line interface to connect numerous AI models and services for solving complicated AI tasks!

<p align="center">
<img width="100%" alt="image" src="https://github.com/user-attachments/assets/dfc0143c-ae74-4818-902d-a75a688ed7eb">    
</p>

We introduce a collaborative system that consists of **an LLM as the controller** and **numerous expert models as collaborative executors** (from HuggingFace Hub). The workflow of our system consists of four stages:
+ **Task Planning**: Using LLM, RAG and NER to define task from user request, store and manage tasks.
+ **Optimize Tasks**: From task's priority, duration, deadline to define user enjoyability and effort to calculate, optimize and schedule user tasks daily. 
+ **Response Generation**: Finally, using LLM to integrate the result of all services, and generate responses.

### System Requirements

#### Default (Recommended)

+ Ubuntu 16.04 LTS
+ VRAM >= 8GB
+ RAM > 8GB (minimal), 16GB (standard)

### Package Design
GaiaBot follows a modular architecture, organized into the following packages:

- **package abilities**: Contains Gaia's abilities for task creation, querying, and optimization.
- **package domain**: Holds DTOs, entities, and model objects.
- **package infrastructure**: Manages cache, local database, and RAG components.
- **package kernel**: Contains configurations and utility functions.
- **package microservices**: Connects to Gaia's backend microservices.
- **package models**: Includes Gaia's AI models.
- **package resources**: Stores static files, audio, and pre-trained AI models.
- **package process**: Core of GaiaBot, handling business logic and user queries.

<p align="center">
<img width="100%" alt="image" src="https://github.com/user-attachments/assets/a2c359a8-d308-415c-bd81-e83122ad5815">    
</p>

## Setup and Installation
```bash
# setup env
conda create -n gaia_bot python=3.10.14
conda activate gaia_bot
conda install pytorch torchvision torchaudio pytorch-cuda=11.7 -c pytorch -c nvidia
pip install -r requirements.txt
# All of instruction would be in Makefile
make run
# Or you can run this command to get help
python __main__.py --help
```
---

### Future Enhancements
- Integrate advanced voice interaction for task management.
- Expand AI model capabilities for predictive task scheduling.

---

GaiaBot is your intelligent CLI companion for efficient and optimized task management. Start organizing your tasks today!

