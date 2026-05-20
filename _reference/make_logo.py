"""Process the ONE TIME logo into optimized web assets + favicon/OG."""
import numpy as np
from PIL import Image, ImageDraw

SRC = "_reference/logo_raw-1.png"
IVORY = (244, 239, 227)
NAVY_BG = (18, 28, 51)


def resize_w(img, w):
    if img.size[0] <= w:
        return img
    h = round(img.size[1] * w / img.size[0])
    return img.resize((w, h), Image.LANCZOS)


# --- white -> transparent via luminance ramp ---
im = Image.open(SRC).convert("RGB")
arr = np.asarray(im).astype(np.float32)
r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
lum = 0.299 * r + 0.587 * g + 0.114 * b
alpha = np.clip((240.0 - lum) / (240.0 - 170.0) * 255.0, 0, 255)
full = Image.fromarray(np.dstack([r, g, b, alpha]).astype(np.uint8), "RGBA")
full = full.crop(full.getbbox())

# --- sample brand colors ---
op = np.asarray(full).astype(int)
solid = op[..., 3] > 210
gold_m = solid & (op[..., 0] > op[..., 2] + 28) & (op[..., 0] > 110)
navy_m = solid & ~gold_m
gpx, npx = op[gold_m][:, :3], op[navy_m][:, :3]
gold = tuple(int(v) for v in np.median(gpx, axis=0))
navy = tuple(int(v) for v in np.median(npx, axis=0))
print("GOLD #%02X%02X%02X" % gold, gold)
print("NAVY #%02X%02X%02X" % navy, navy)

# --- light variant (navy -> ivory, gold kept) ---
a2 = np.asarray(full).astype(np.float32)
r2, g2, b2 = a2[..., 0], a2[..., 1], a2[..., 2]
gold2 = (r2 > b2 + 28) & (r2 > 110)
out = a2.copy()
for i, v in enumerate(IVORY):
    out[..., i] = np.where(gold2, a2[..., i], v)
light = Image.fromarray(out.astype(np.uint8), "RGBA")

# --- monogram crop (top cluster before first empty row) ---
rows = (np.asarray(full)[..., 3] > 20).any(axis=1)
first = int(np.argmax(rows))
gap = next((y for y in range(first, len(rows)) if not rows[y]), None)
mark = full.crop((0, 0, full.size[0], gap)).crop(
    full.crop((0, 0, full.size[0], gap)).getbbox())
mark_l = light.crop((0, 0, light.size[0], gap)).crop(
    light.crop((0, 0, light.size[0], gap)).getbbox())

# --- save optimized ---
for name, img, w in [
    ("onetime-logo.png", full, 820),
    ("onetime-logo-light.png", light, 820),
    ("onetime-mark.png", mark, 360),
    ("onetime-mark-light.png", mark_l, 360),
]:
    o = resize_w(img, w)
    o.save("public/" + name)
    print(name, o.size)


def rounded_icon(size, pad_ratio=0.16, radius_ratio=0.24):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255)
    bg = Image.new("RGBA", (size, size), NAVY_BG + (255,))
    canvas.paste(bg, (0, 0), mask)
    pad = int(size * pad_ratio)
    inner = size - pad * 2
    m = mark_l.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.size[0]) // 2, (size - m.size[1]) // 2))
    return canvas


rounded_icon(64).save("public/favicon.png")
rounded_icon(180, 0.14).save("public/apple-touch-icon.png")
print("favicon.png 64  apple-touch-icon.png 180")

# --- OG image 1200x630 ---
og = Image.new("RGBA", (1200, 630), NAVY_BG + (255,))
ol = resize_w(light, 560)
og.alpha_composite(ol, ((1200 - ol.size[0]) // 2, (630 - ol.size[1]) // 2))
og.convert("RGB").save("public/og-image.jpg", quality=88)
print("og-image.jpg 1200x630")
