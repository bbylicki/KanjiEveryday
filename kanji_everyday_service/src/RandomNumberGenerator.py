from datetime import datetime, timedelta
from random import randint # , seed
import time

def durable_randint(*, low = 1, high = 100, duration = timedelta(days = 1)):
    assert isinstance(duration, timedelta), 'duration must be a "timedelta"!'
    today = datetime.now()
    # seed(today.strftime("%Y:%m:%d"))
    last = today - 2 * duration
    while True:
        now = datetime.now()
        if now - last > duration:
            x = randint(low, high)
            last = datetime.now()
        yield x