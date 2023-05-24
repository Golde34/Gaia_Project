import sys
import time
import itertools
import threading


class SpinnerThread(threading.Thread):
    def __init__(self, label="Hmmm... ", delay=0.2):
        super(SpinnerThread, self).__init__()
        self.label = label
        self.delay = delay
        self.running = False

    def start(self):
        self.running = True
        super(SpinnerThread, self).start()

    def run(self):
        chars = itertools.cycle(r'-\|/')
        while self.running:
            sys.stdout.write('\r' + self.label + next(chars))
            sys.stdout.flush()
            time.sleep(self.delay)

    def stop(self):
        self.running = False
        self.join()
        self.stdout.write('\r')
        self.stdout.flush()
