import time


def convert_time_from_float_to_str(time_float: float) -> str:
    """
    Convert time from float to string: 
    :param time_float: float
    :return: str
    """
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time_float))

def convert_time_from_str_to_float(time_str: str) -> float:
    """
    Convert time from string to float
    :param time_str: str
    :return: float
    """
    return time.mktime(time.strptime(time_str, '%Y-%m-%d %H:%M:%S'))
