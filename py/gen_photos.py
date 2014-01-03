import requests
from base64 import b64encode
import string
import random

images = 10
size = 64
type = 'jpeg'
file_path = "../js/photos.js"
chars = string.ascii_letters + string.digits

def gen_id(length = 2, chars = chars):
    return ''.join(random.choice(chars) for x in range(length))


def gen_js_file(images, size, type, file_path):
    with open(file_path, 'w') as f:
        f.write("var photosArr = [\n")
        c = Color()

        for i in range(0, images):
            url = "http://dummyimage.com/%d/%s/%s.%s&text=%s" % (size, c.rnd_color(), c.contrast(), type, gen_id())
            print url
            r = requests.get(url)
            
            temp = b64encode(r.content) if r.status_code == 200 else ""
            f.write("\t\"%s\"" % temp)
            f.write(",\n") if i < (images - 1) else f.write("\n];\n\n")
        
        f.write("var photosType = '%s';\n" % type.upper())


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

if __name__ == "__main__":
    gen_js_file(images, size, type, file_path)
