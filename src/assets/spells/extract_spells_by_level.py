import json
with open("spells_mage.json", "r", encoding="utf-8") as f:
    obj = json.load(f)

spells_by_level = {}
for spell in obj:
    if "niveau" +str(spell["Niveau"]) not in spells_by_level:
        spells_by_level["niveau" + str(spell["Niveau"])] = []
    spells_by_level["niveau" + str(spell["Niveau"])].append(spell["Nom"])

with open("extract", "w", encoding="utf-8") as f:
    json.dump(spells_by_level,f,indent=4,ensure_ascii=False)