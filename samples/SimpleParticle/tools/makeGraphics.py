from imageSize import imageSize
import shutil
import os

ATLAS_1x  = "../assets/graphics/1x/"
ATLAS_15x = "../assets/graphics/1.5x/"
ATLAS_2x  = "../assets/graphics/2x/"

def main() :
    
    shutil.rmtree(ATLAS_1x);   shutil.copytree(ATLAS_2x, ATLAS_1x)
    shutil.rmtree(ATLAS_15x);  shutil.copytree(ATLAS_2x, ATLAS_15x)
    
    def getSize(width, height, factor):
        return str(round(height / 2 * factor)) + " " + str(round(width / 2 * factor))
    
    def processFile(dir):
        for file in os.listdir(dir):
            file = os.path.join(dir, file)
            if os.path.isfile(file):
                if file.count(".png") or file.count(".jpg")\
                                      or file.count(".jpeg"):
                    width, height = imageSize(file)
                    os.system("sips -z " + getSize(width, height, 1)   + " '" + file.replace(ATLAS_2x, ATLAS_1x)  + "'")
                    os.system("sips -z " + getSize(width, height, 1.5) + " '" + file.replace(ATLAS_2x, ATLAS_15x) + "'")
            else:
                processFile(file)
    
    processFile(ATLAS_2x)
    
if __name__ == "__main__":
    main()
