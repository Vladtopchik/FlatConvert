from django.contrib.staticfiles.finders import find
from markupsafe import Markup


def load_svg(path: str) -> Markup:
    svg_path = find(f"images/{path}")

    if svg_path is None:
        raise FileNotFoundError(f'SVG not found in staticfiles: {path}')

    with open(svg_path, 'r') as f:
        content = f.read()

    if '<svg' not in content:
        raise ValueError("File does not look like SVG")

    return Markup(content)
