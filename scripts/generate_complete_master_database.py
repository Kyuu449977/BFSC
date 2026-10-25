# -*- coding: utf-8 -*-
"""
Script to generate the complete regional databases for ja, ko, zh, en
and the two-way translations for DISH_TRANSLATIONS.
"""
import json
import re

# We will create clean, rich database dictionaries for all 4 countries.
print("Building comprehensive database generator...")
