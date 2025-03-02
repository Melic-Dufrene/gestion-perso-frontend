import json

FILENAME = "./spells_mage.json"

with open(FILENAME, "r", encoding="utf-8") as f:
    spells = json.load(f)


for s in spells:
    try:
        title = s["Nom"].split("(")[0]
        stype = s["Nom"].split("(")[1]
        title = title.strip()
        stype = "(" + stype.strip()
    except KeyError as e:
        print(s)
        continue

    s["Nom"] = title
    s["Type"] = stype

with open("output.json", "w", encoding="utf-8") as fp:
    json.dump(spells, fp, indent=4, ensure_ascii=False)
