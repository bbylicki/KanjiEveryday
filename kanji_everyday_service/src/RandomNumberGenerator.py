from datetime import datetime, timedelta
from random import randint # , seed
import time

def durable_randint(*, low = 1, high = 100, duration = timedelta(days = 1), excluded = []):
    assert isinstance(duration, timedelta), 'duration must be a "timedelta"!'
    today = datetime.now()
    # seed(today.strftime("%Y:%m:%d"))
    last = today - 2 * duration
    csvPath = "../language_data/completed_Kanji.csv"
    data = pd.read_csv(csvPath)
    excludedIndices = data.index[data["completed"] == 1].tolist()
    excludedSet = set(excludedIndices)
    while True:
        now = datetime.now()
        if now - last > duration:
            x = randint(low, high)
            while x in excluded:
                x = x+1
                if x > high: x = low
            last = datetime.now()
        yield x