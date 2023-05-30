import os
import tempfile
from colorama import Fore
import sys
import nltk
import re

from utils.console import console_output

HISTORY_FILENAME = tempfile.TemporaryFile('w+t')
PROMPT_CHAR = '~>'