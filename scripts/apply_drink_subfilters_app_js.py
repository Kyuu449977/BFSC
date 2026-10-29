with open('src/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add subDrinkFilter variable
target1 = "let searchTerm = '',"
replacement1 = "let subDrinkFilter = 'all';\n  let searchTerm = '',"

# 2. Add filter condition in menu()
target2 = "(filter === 'all' || dish.mealId === filter) &&\n        (!collectionOnly || engine.collection[dish.id] > 0) &&"
replacement2 = "(filter === 'all' || dish.mealId === filter) &&\n        (filter !== 'drinks' || subDrinkFilter === 'all' || dish.filter === subDrinkFilter) &&\n        (!collectionOnly || engine.collection[dish.id] > 0) &&"

# 3. Add buildDrinkSubFilters and integrate into buildFilters
target3 = """          filter = id;
          visibleCount = 12;
          $('filters')
            .querySelectorAll('button')
            .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
          menu();"""

replacement3 = """          filter = id;
          if (filter === 'drinks') {
            if ($('drinkSubFilters')) $('drinkSubFilters').hidden = false;
            buildDrinkSubFilters(settings.language || 'vi');
          } else {
            if ($('drinkSubFilters')) $('drinkSubFilters').hidden = true;
          }
          visibleCount = 12;
          $('filters')
            .querySelectorAll('button')
            .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
          menu();"""

subfilters_func = """
  function buildDrinkSubFilters(currentLang = settings.language || 'vi') {
    const subContainer = $('drinkSubFilters');
    if (!subContainer) return;
    const subTabs = [
      { id: 'all', label: 'Tất cả đồ uống' },
      { id: 'tra_sua', label: 'Trà sữa & Matcha' },
      { id: 'ca_phe_tra', label: 'Cà phê & Trà trái cây' },
      { id: 'sinh_to_nuoc_ep', label: 'Sinh tố & Nước ép' },
      { id: 'nuoc_ngot', label: 'Nước ngọt & Giải khát' }
    ];
    subContainer.replaceChildren(
      ...subTabs.map(tab => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'drink-sub-btn';
        btn.textContent = tab.label;
        btn.setAttribute('aria-pressed', String(subDrinkFilter === tab.id));
        btn.onclick = () => {
          subDrinkFilter = tab.id;
          visibleCount = 12;
          subContainer.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
          menu();
        };
        return btn;
      })
    );
  }
"""

if target1 in text:
    text = text.replace(target1, replacement1, 1)
    print("Replaced target1")
else:
    print("target1 not found!")

if target2 in text:
    text = text.replace(target2, replacement2, 1)
    print("Replaced target2")
else:
    print("target2 not found!")

if target3 in text:
    text = text.replace(target3, replacement3, 1)
    print("Replaced target3")
else:
    print("target3 not found!")

# Append subfilters_func right before buildFilters
if "function buildFilters(" in text:
    text = text.replace("function buildFilters(", subfilters_func + "\n  function buildFilters(", 1)
    print("Added subfilters_func")

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('app.js updated with drink sub-filters!')
