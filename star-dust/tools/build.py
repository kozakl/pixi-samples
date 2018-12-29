import os;

def main() :
   
    files = [];
    
    for file in os.listdir("../lib") :
        if file.count(".js") == 1 :
            files.append("../lib/" + file);
    
	
    files.append("../src/utils/BlindManager.js");
    files.append("../src/utils/emulateBind.js");
    files.append("../src/utils/MathUtil.js");
    files.append("../src/utils/ObjectPool.js");
    files.append("../src/utils/ScaleUtil.js");
    files.append("../src/utils/DetectDevice.js");
    files.append("../src/display/Content.js");
    files.append("../src/display/Eye.js");
    files.append("../src/display/Menu.js");
    files.append("../src/display/OrbitPreloader.js");
    files.append("../src/display/WoodBg.js");
    files.append("../src/model/UserData.js");
    files.append("../src/Main.js");
	
    command = "java -jar compiler.jar --language_in=ECMASCRIPT5 --compilation_level SIMPLE_OPTIMIZATIONS";
    
    for file in files:
        command += " --js " + file;

    command += " --js_output_file .temp --accept_const_keyword";
    os.system(command);
    
    file = open("../test.html", "r");
    lines = file.readlines();
    file.close();
    
    index = 0;
    i = 0;
    while (i < len(lines)) :
		if lines[i].count("type=\"text/javascript\" src=") == 1 :
			del lines[i];
			index = i;
			i = i - 1;
		i = i + 1;

    file = open(".temp", "r")
    lines.insert(index, "\t<script>" + file.read() + "</script>\n");
    file.close();
    os.remove(".temp");
    
    data = ""
    for line in lines :
        data = data + line;
    
    file = open("../index.html", "w");
    file.write(data);
    file.close();
    
if __name__ == "__main__":
    main();