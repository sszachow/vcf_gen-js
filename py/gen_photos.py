import requests
from base64 import b64encode
from color import Color
import string
import random

images = 10
size = 64
type = 'jpeg'
types = ['jpeg', 'png', 'gif']
file_path = "../js/photos.js"
chars = string.ascii_letters + string.digits

def gen_id(length = 2, chars = chars):
    return ''.join(random.choice(chars) for x in range(length))

def gen_params(images):
    params = []
    c = Color()
    
    for i in range(0, images):
        el = {}
        el['color'] = c.rnd_color()
        el['contrast'] = c.contrast()
        el['id'] = gen_id()
        params.append(el)
    
    return params

def get_image(size, back_color, text_color, type, text):
    url = "http://dummyimage.com/%d/%s/%s.%s&text=%s" % (size, back_color, text_color, type, text)
    print url
    r = requests.get(url)
    return r.content if r.status_code == 200 else ""
    
def gen_js_file2(images, size, types, file_path):
    with open(file_path, 'w') as f:
        params = gen_params(images)
        f.write("var photos = {\n")
        
        for i, type in enumerate(types):
            f.write("\t%s: [" % type)
            
            for j in range(0, images):
                temp = get_image(size, params[j]['color'], params[j]['contrast'], type, params[j]['id'])
                f.write("\n\t\t\"%s\", " % b64encode(temp)) if j < (images - 1) else f.write("\n\t\t\"%s\"" % b64encode(temp))
                
            f.write("\n\t],\n") if i < (len(types) - 1) else f.write("\n\t]\n")
        
        f.write("};")
        print params
        
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

if __name__ == "__main__":
    gen_js_file(images, size, type, file_path)
    #gen_js_file2(images, size, types, file_path)
