import sys, json, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's extract FOOD_DATABASE and REGIONAL_DATABASES
# We can use node to evaluate data.js and export all dishes as JSON!
