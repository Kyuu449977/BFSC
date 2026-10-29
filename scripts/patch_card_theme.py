with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    text = f.read()

# Add to dark root
text = text.replace(
    "--cream: #181c21;\n  --ink: #f1ece6;",
    "--cream: #181c21;\n  --card-bg: #23282f;\n  --ink: #f1ece6;"
)
text = text.replace(
    "--cream: #101c2e;\n  --ink: #f0f6fc;",
    "--cream: #101c2e;\n  --card-bg: #17263c;\n  --ink: #f0f6fc;"
)
text = text.replace(
    "--cream: #0c1728;\n  --ink: #f0f6fc;",
    "--cream: #0c1728;\n  --card-bg: #132238;\n  --ink: #f0f6fc;"
)

# Append explicit card theme rule
extra_rule = """
/* Guaranteed high contrast card background and typography across all themes */
.dish-card, button.dish-card {
  background: var(--card-bg, #ffffff);
  color: var(--ink);
  border-color: var(--border);
}
.dish-card:hover, button.dish-card:hover {
  background: var(--card-bg, #ffffff);
}
.dish-card .dish-name {
  color: var(--ink);
}
.dish-card .dish-body {
  color: var(--ink);
}
"""

if "Guaranteed high contrast card background" not in text:
    text += "\n" + extra_rule

with open('src/styles/themes.css', 'w', encoding='utf-8') as f:
    f.write(text)

print("themes.css updated!")
