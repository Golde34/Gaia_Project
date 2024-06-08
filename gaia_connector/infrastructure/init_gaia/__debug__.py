import argparse
import asyncio

from initiate_bot import process_bot


## DEBUG
if __name__ == "__main__":
    asyncio.run(process_bot())