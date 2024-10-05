from datetime import datetime, timezone, timedelta

def convert_time_from_float_to_str(time_float: float) -> str:
    """
    Convert time from float to string: 
    :param time_float: float
    :return: str
    """
    dt = datetime.fromtimestamp(time_float, timezone.utc)
    iso8601_time = dt.isoformat(timespec='seconds').replace('+00:00', 'Z')
    return iso8601_time

def convert_time_from_str_to_float(time_str: str) -> float:
    """
    Convert time from string to float
    :param time_str: str
    :return: float
    """
    dt = datetime.fromisoformat(time_str)
    time_float = dt.timestamp()
    return time_float