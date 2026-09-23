import json, os

ROOT = r"C:\Users\hi\Downloads\webdev\BroPortifolio"
FILE = os.path.join(ROOT, "content", "portfolio.json")

counts = {
    "ethiopian-orthodox-church-design": 15,
    "enda-mikael-palace-reimagination": 9,
    "climate-responsive-high-school": 7,
    "street-playground": 5,
    "adaptive-corridor-residential": 7,
    "adaptive-corridor-community-hall": 9,
    "eiabc-football-field-landscape": 6,
    "compact-climate-responsive-house": 8,
    "urban-spine-revitalization": 3,
    "breathable-clay-wall-system": 14,
}

with open(FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

def make_img(slug, n):
    return {
        "src": f"/images/work/{slug}/{slug}-{n:02d}.png",
        "alt": "",
        "altAm": "",
        "caption": "",
        "captionAm": "",
        "isHero": n == 1,
        "width": None,
        "height": None,
    }

report = {}
for p in data["projects"]:
    slug = p["slug"]
    if slug not in counts:
        raise SystemExit(f"Unexpected slug: {slug}")
    n = counts[slug]
    p["images"] = [make_img(slug, i) for i in range(1, n + 1)]
    report[slug] = len(p["images"])

data.setdefault("meta", {})
data["meta"]["imagesPopulatedFromDisk"] = True
data["meta"]["imageNote"] = (
    "Image src paths point to .png placeholder files currently on disk. "
    "They will be swapped to optimized formats (AVIF/WebP) later WITHOUT changing "
    "the base filename contract <slug>-NN. next/image transcodes PNG sources at build time. "
    "alt/altAm/caption/captionAm are intentionally empty pending owner review; "
    "width/height are null pending optimization."
)

with open(FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

total = sum(report.values())
print("PER-PROJECT IMAGE COUNTS WRITTEN:")
for k, v in report.items():
    print(f"  {k} = {v}")
print(f"TOTAL IMAGES = {total}")
print("JSON valid and written OK.")
