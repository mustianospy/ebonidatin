import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace the entire sliderImages array
new_slider_images = """const sliderImages = [
  "/couple1.jpg",
  "/couple2.jpg",
  "/couple3.jpg",
  "/couple4.jpg",
  "/couple5.jpg",
];"""

content = re.sub(
    r'const sliderImages = \[[^\]]*\];', 
    new_slider_images, 
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("Fixed image paths in app/page.tsx")
