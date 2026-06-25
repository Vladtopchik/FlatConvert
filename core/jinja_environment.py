from django.templatetags.static import static
from django.urls import reverse
from django.utils.translation import gettext
from jinja2 import Environment
from .utils import load_svg


def environment(**options):
    env = Environment(**options)

    env.globals.update({
        "static": static,
        "css": lambda x: static(f"css/{x}"),
        "url": reverse,
        "load_svg": load_svg,
        "_": gettext
    })

    return env
