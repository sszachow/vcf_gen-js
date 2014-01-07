import random

class Color(object):
    def __init__(self, r = 0, g = 0, b = 0, max_color = 0xf):
        self.r = r
        self.g = g
        self.b = b
        self.max_color = max_color

    def as_string(self):
        return hex(self.r)[2:] + hex(self.g)[2:] + hex(self.b)[2:]
    
    def average_color(self):
        return float(self.r + self.g + self.b) / 3
    
    def rnd_color(self):
        self.r = random.randint(0, self.max_color)
        self.g = random.randint(0, self.max_color)
        self.b = random.randint(0, self.max_color)
        return self.as_string()
    
    def contrast(self):
        tmp_arr = [self.r, self.g, self.b]
        sum = min(tmp_arr) + max(tmp_arr)
        sum = self.max_color if sum > self.max_color else sum
        self.r = sum - self.r
        self.g = sum - self.g
        self.b = sum - self.b
        return self.as_string()
