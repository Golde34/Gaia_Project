import torch
import pandas as pd
import numpy as np
from pathlib import Path
import fastparquet

import model_config

random_seed = 17
np.random.seed(random_seed)

# Load data
df_origin = pd.read_parquet(model_config.DATA_FILE_1, engine="fastparquet")

print(df_origin)