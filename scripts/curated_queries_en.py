import sys
sys.stdout.reconfigure(encoding='utf-8')

EN_QUERIES = {
    # Morning (8)
    "en_m_1": ["Full English breakfast plate", "Traditional English breakfast", "Full breakfast"],
    "en_m_2": ["Pancakes with butter and syrup", "Stack of buttermilk pancakes", "Pancakes stack"],
    "en_m_3": ["Eggs Benedict with hollandaise", "Classic Eggs Benedict", "Eggs Benedict"],
    "en_m_4": ["Avocado toast with poached egg", "Sourdough avocado toast", "Avocado toast"],
    "en_m_5": ["Bagel with lox and cream cheese", "Smoked salmon bagel", "Lox bagel"],
    "en_m_6": ["French toast with berries", "Brioche French toast", "French toast plate"],
    "en_m_7": ["Belgian waffle with whipped cream and berries", "Belgian waffles fresh fruit", "Waffle with berries"],
    "en_m_8": ["Tortilla espanola slice", "Spanish tortilla frittata", "Tortilla de patatas"],

    # Lunch (12)
    "en_l_1": ["Smash cheeseburger and french fries", "Double cheeseburger fries", "Cheeseburger plate"],
    "en_l_2": ["Pepperoni pizza slice New York", "Pepperoni pizza whole", "Pizza pepperoni"],
    "en_l_3": ["Fish and chips with tartar sauce", "British fish and chips plate", "Fish and chips"],
    "en_l_4": ["Spaghetti Bolognese parmesan", "Spaghetti bolognese plate", "Pasta bolognese"],
    "en_l_5": ["Clam chowder in bread bowl", "New England clam chowder bread bowl", "Clam chowder bowl"],
    "en_l_6": ["Maine lobster roll sandwich", "Lobster roll with fries", "Lobster roll"],
    "en_l_7": ["Philly cheesesteak sandwich", "Philadelphia cheesesteak", "Cheesesteak sandwich"],
    "en_l_8": ["Chicken Caesar salad bowl", "Classic Caesar salad chicken", "Caesar salad"],
    "en_l_9": ["Club sandwich with french fries", "Triple decker club sandwich", "Club sandwich"],
    "en_l_10": ["Carnitas street tacos lime", "Mexican street tacos cilantro", "Tacos carnitas"],
    "en_l_11": ["French onion soup gratinee", "French onion soup bowl cheese", "French onion soup"],
    "en_l_12": ["Pastrami on rye sandwich", "Hot pastrami sandwich", "Pastrami sandwich"],

    # Afternoon (10)
    "en_a_1": ["Buffalo chicken wings celery", "Buffalo wings with dip", "Crispy buffalo wings"],
    "en_a_2": ["Fried chicken tenders basket", "Chicken tenders with sauce", "Chicken strips fried"],
    "en_a_3": ["Fried mozzarella sticks marinara", "Mozzarella sticks cheese pull", "Mozzarella sticks"],
    "en_a_4": ["Loaded beef nachos platter", "Nachos supreme cheese guacamole", "Nachos cheese"],
    "en_a_5": ["Churros with chocolate sauce", "Churros con chocolate dip", "Spanish churros"],
    "en_a_6": ["Fried calamari with lemon aioli", "Calamari rings fried", "Fried calamari"],
    "en_a_7": ["Beer battered onion rings", "Fried onion rings basket", "Onion rings crispy"],
    "en_a_8": ["Chili cheese fries loaded", "French fries with chili cheese", "Chili cheese fries"],
    "en_a_9": ["Soft pretzel bites beer cheese", "Pretzel with beer cheese", "Soft pretzel bites"],
    "en_a_10": ["Fried pickles spears ranch", "Deep fried pickles ranch dip", "Fried pickles"],

    # Dinner (10)
    "en_d_1": ["Ribeye steak grilled rosemary", "Prime ribeye steak herb butter", "Grilled ribeye steak"],
    "en_d_2": ["Smoked beef brisket sliced Texas", "Texas BBQ beef brisket", "Smoked brisket"],
    "en_d_3": ["Barbecue pork ribs rack", "Smoked BBQ ribs glazed", "BBQ ribs plate"],
    "en_d_4": ["Sunday roast beef Yorkshire pudding", "Roast beef Sunday dinner", "Sunday roast plate"],
    "en_d_5": ["Shepherd's pie baked mashed potato", "Traditional shepherd's pie", "Cottage pie baked"],
    "en_d_6": ["Seafood jambalaya skillet", "Louisiana seafood jambalaya", "Jambalaya plate"],
    "en_d_7": ["Fettuccine alfredo truffle parmesan", "Fettuccine alfredo pasta bowl", "Creamy fettuccine alfredo"],
    "en_d_8": ["Cioppino seafood stew bowl", "San Francisco cioppino", "Seafood cioppino stew"],
    "en_d_9": ["Steak and ale pie pastry", "Steak and ale pie British", "Meat pie pastry"],
    "en_d_10": ["Pan seared salmon with asparagus", "Grilled salmon fillet asparagus", "Salmon fillet plate"],

    # Snacks / Desserts (7)
    "en_s_1": ["New York cheesecake slice strawberry", "Classic cheesecake slice", "New York cheesecake"],
    "en_s_2": ["Chocolate lava cake melting ice cream", "Warm molten chocolate cake", "Chocolate lava cake"],
    "en_s_3": ["Apple pie slice cinnamon flaky", "Warm apple pie slice", "Classic apple pie"],
    "en_s_4": ["Sticky toffee pudding butterscotch", "British sticky toffee pudding", "Sticky toffee pudding"],
    "en_s_5": ["Eton mess strawberries cream", "Traditional Eton mess dessert", "Eton mess"],
    "en_s_6": ["Cinnamon roll cream cheese frosting", "Frosted cinnamon roll warm", "Cinnamon roll"],
    "en_s_7": ["Scones with clotted cream and jam", "British scones cream tea", "Scones clotted cream"],

    # Drinks (8)
    "en_dr_1": ["Iced vanilla oat milk latte glass", "Iced vanilla latte tall glass", "Iced latte glass"],
    "en_dr_2": ["Cold brew coffee glass ice", "Glass of iced cold brew coffee", "Cold brew coffee"],
    "en_dr_3": ["Strawberry lemonade glass ice", "Fresh strawberry lemonade drink", "Pink lemonade glass"],
    "en_dr_4": ["Root beer float vanilla ice cream", "Classic root beer float mug", "Root beer float"],
    "en_dr_5": ["Caramel milkshake whipped cream", "Salted caramel milkshake glass", "Milkshake whipped cream"],
    "en_dr_6": ["London fog latte tea earl grey", "Earl grey tea latte foam", "London fog drink"],
    "en_dr_7": ["IPA craft beer pint glass foam", "India pale ale pint glass", "Craft beer pint"],
    "en_dr_8": ["Cosmopolitan cocktail martini glass", "Cosmopolitan drink lime cranberry", "Cosmopolitan cocktail"]
}
