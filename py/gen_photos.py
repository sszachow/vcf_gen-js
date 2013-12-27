import requests
from base64 import b64encode
import string
import random

size = 24
type = 'jpeg'
images = 10
file_path = "../js/photos.js"

def id_generator(size = 2, chars = string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

url = "http://dummyimage.com/%d/000/fff.%s&text=%s" % (size, type, id_generator())

f = open(file_path, 'w');
f.write("var photosArr = [\n")

for i in range(0, images):
    url = "http://dummyimage.com/%d/000/fff.%s&text=%s" % (size, type, id_generator())
    print url
    r = requests.get(url)

    if r.status_code == 200:
        temp = b64encode(r.content)
    else:
        temp = ""
    
    f.write("\t\"%s\"" % temp)
    if i < (images - 1):
        f.write(",\n")
    else:
        f.write("\n];\n")

f.close()
    
    
