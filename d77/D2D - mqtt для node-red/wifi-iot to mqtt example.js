[
    {
        "id": "afc25e54.69509",
        "type": "udp in",
        "z": "e1065fff.ffb87",
        "name": "",
        "iface": "",
        "port": "32700",
        "ipv": "udp4",
        "multicast": "false",
        "group": "",
        "datatype": "buffer",
        "x": 240,
        "y": 200,
        "wires": [
            [
                "85c67563.3ae948"
            ]
        ]
    },
    {
        "id": "85c67563.3ae948",
        "type": "function",
        "z": "e1065fff.ffb87",
        "name": "",
        "func": "const mail = \"testt@gmail.com\";\nvar type_name = [\"na\", \"gpio\", \"pwm\", \"temp\", \"hum\", \"pressure\", \"cnt\", \"light\", \"ppmco2\", \"volt\", \"current\", \"watt\", \"watth\", \"error\", \"naneg\", \"hidden\", \"rssi\", \"bat\", \"weight\", \"angle\", \"fert\", \"dist\", \"pm\", \"msg\", \"fr\"];\nvar bufstr = (msg.payload.slice(6)).toString();\nif(bufstr != context.buf)\n{\n\tcontext.buf = bufstr;\n\tcontext.t = [];\n\tfor(let g = 0; g < type_name.length; g+=1)\n\t{\n\t\tcontext.t[g] = 1;\n\t}\n\tcontext.t[14] = 0;\n\tvar buf = msg.payload;\n\tvar host =((new Buffer(buf.slice(6,buf.indexOf(0,6)))).toString());\n\tvar pos = 22;\n\tvar msgg = [];\n\twhile(pos < buf.length)\n\t{\n\t\tlet type = buf[pos]&0x1F;\n\t\tif(type == 1)\n\t\t{\n\t\t\tlet st = (buf[pos]/64)&1;\n\t\t\tlet mode = buf[pos]&(128 + 32);\n\t\t\tmode = (mode === 0) ? \"input\" : (mode == 128) ? \"output\" : \"control\";\n\t\t\tpos+=1 ;\n\t\t\tlet gpio = buf[pos];\n\t\t\tmsgg.push({topic:(mail + \"/\" + host + \"/\" + mode + gpio), payload: st ,retain: false ,qos: 1});\n\t\t\tpos+=1 ;\n\t\t\tcontinue;\n\t\t}\n\t\tif(type == 2)\n\t\t{\n\t\t\tlet pwm = buf[pos+=1];\n\t\t\tlet st = buf[pos+=1]*256;\n\t\t\tst |= buf[pos+=1];\n\t\t\tmsgg.push({topic:(mail + \"/\" + host + \"/pwm\" + pwm), payload: st ,retain: false ,qos: 1});\n\t\t\tpos+=1 ;\n\t\t\tcontinue;\n\t\t}\n\t\tif(type == 15 || type == 13)\n\t\t{\n\t\t\tpos+=1 ;\n\t\t\tcontinue;\n\t\t}\n\t\tlet flags = buf[pos];\n\t\tlet flmode=((flags/64)&3);\n\t\tlet sizedata=(buf[pos]&32)?3:1;\n\t\tlet data = buf[pos+=1];\n\t\tfor(let g = 0; g < sizedata; g+=1) \n\t\t{\n\t\t\tdata = (data*256)+buf[pos+=1];\n\t\t\tif(sizedata < 2 && data > 32768)\n\t\t\t{\n\t\t\t\tdata -= 65536;\n\t\t\t}\n\t\t}\n\t\tfor(let g = 0; g < flmode; g+=1)\n\t\t{\n\t\t\tdata/=10;\n\t\t}\n\t\tpos+=1 ;\n\t\tlet name = type_name[type] + context.t[type];\n\t\tmsgg.push({topic:(mail + \"/\" + host + \"/\" + type_name[type] + [context.t[type]]), payload: data ,retain: false ,qos: 1});\n\t\tcontext.t[type] += 1; \n\t}\n\treturn [msgg];\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 400,
        "y": 200,
        "wires": [
            [
                "8f496b4b.0b6148"
            ]
        ]
    },
    {
        "id": "8f496b4b.0b6148",
        "type": "mqtt out",
        "z": "e1065fff.ffb87",
        "name": "",
        "topic": "",
        "qos": "",[
    {
        "id": "afc25e54.69509",
        "type": "udp in",
        "z": "e1065fff.ffb87",
        "name": "",
        "iface": "",
        "port": "32700",
        "ipv": "udp4",
        "multicast": "false",
        "group": "",
        "datatype": "buffer",
        "x": 240,
        "y": 200,
        "wires": [
            [
                "85c67563.3ae948"
            ]
        ]
    },
    {
        "id": "85c67563.3ae948",
        "type": "function",
        "z": "e1065fff.ffb87",
        "name": "",
        "func": "const mail = \"testt@gmail.com\";\nvar type_name = [\"na\", \"gpio\", \"pwm\", \"temp\", \"hum\", \"pressure\", \"cnt\", \"light\", \"ppmco2\", \"volt\", \"current\", \"watt\", \"watth\", \"error\", \"naneg\", \"hidden\", \"rssi\", \"bat\", \"weight\", \"angle\", \"fert\", \"dist\", \"pm\", \"msg\", \"fr\"];\nvar bufstr = (msg.payload.slice(6)).toString();\nif(bufstr != context.buf)\n{\n\tcontext.buf = bufstr;\n\tcontext.t = [];\n\tfor(let g = 0; g < type_name.length; g+=1)\n\t{\n\t\tcontext.t[g] = 1;\n\t}\n\tcontext.t[14] = 0;\n\tvar buf = msg.payload;\n\tvar host =((new Buffer(buf.slice(6,buf.indexOf(0,6)))).toString());\n\tvar pos = 22;\n\tvar msgg = [];\n\twhile(pos < buf.length)\n\t{\n\t\tlet type = buf[pos]&0x1F;\n\t\tif(type == 1)\n\t\t{\n\t\t\tlet st = (buf[pos]/64)&1;\n\t\t\tlet mode = buf[pos]&(128 + 32);\n\t\t\tmode = (mode === 0) ? \"input\" : (mode == 128) ? \"output\" : \"control\";\n\t\t\tpos+=1 ;\n\t\t\tlet gpio = buf[pos];\n\t\t\tmsgg.push({topic:(mail + \"/\" + host + \"/\" + mode + gpio), payload: st ,retain: false ,qos: 1});\n\t\t\tpos+=1 ;\n\t\t\tcontinue;\n\t\t}\n\t\tif(type == 2)\n\t\t{\n\t\t\tlet pwm = buf[pos+=1];\n\t\t\tlet st = buf[pos+=1]*256;\n\t\t\tst |= buf[pos+=1];\n\t\t\tmsgg.push({topic:(mail + \"/\" + host + \"/pwm\" + pwm), payload: st ,retain: false ,qos: 1});\n\t\t\tpos+=1 ;\n\t\t\tcontinue;\n\t\t}\n\t\tif(type == 15 || type == 13)\n\t\t{\n\t\t\tpos+=1 ;\n\t\t\tcontinue;\n\t\t}\n\t\tlet flags = buf[pos];\n\t\tlet flmode=((flags/64)&3);\n\t\tlet sizedata=(buf[pos]&32)?3:1;\n\t\tlet data = buf[pos+=1];\n\t\tfor(let g = 0; g < sizedata; g+=1) \n\t\t{\n\t\t\tdata = (data*256)+buf[pos+=1];\n\t\t\tif(sizedata < 2 && data > 32768)\n\t\t\t{\n\t\t\t\tdata -= 65536;\n\t\t\t}\n\t\t}\n\t\tfor(let g = 0; g < flmode; g+=1)\n\t\t{\n\t\t\tdata/=10;\n\t\t}\n\t\tif(flmode > 0)\n\t    {\n\t        data = parseFloat(data.toFixed(flmode));\n\t    }\n\t\tpos+=1 ;\n\t\tlet name = type_name[type] + context.t[type];\n\t\tmsgg.push({topic:(mail + \"/\" + host + \"/\" + type_name[type] + [context.t[type]]), payload: data ,retain: false ,qos: 1});\n\t\tcontext.t[type] += 1; \n\t}\n\treturn [msgg];\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 400,
        "y": 200,
        "wires": [
            [
                "8f496b4b.0b6148"
            ]
        ]
    },
    {
        "id": "8f496b4b.0b6148",
        "type": "mqtt out",
        "z": "e1065fff.ffb87",
        "name": "",
        "topic": "",
        "qos": "",
        "retain": "",
        "broker": "4d15729e.106f2c",
        "x": 550,
        "y": 200,
        "wires": []
    },
    {
        "id": "4d15729e.106f2c",
        "type": "mqtt-broker",
        "z": "",
        "broker": "localhost",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "willTopic": "",
        "willQos": "0",
        "willPayload": ""
    }
]
        "retain": "",
        "broker": "4d15729e.106f2c",
        "x": 550,
        "y": 200,
        "wires": []
    },
    {
        "id": "4d15729e.106f2c",
        "type": "mqtt-broker",
        "z": "",
        "broker": "localhost",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "willTopic": "",
        "willQos": "0",
        "willPayload": ""
    }
]
