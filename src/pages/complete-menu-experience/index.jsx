import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MenuSearchBar from './components/MenuSearchBar';
import MenuFilters from './components/MenuFilters';
import MenuCategorySection from './components/MenuCategorySection';
import Icon from '../../components/AppIcon';

const CompleteMenuExperience = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [mealType, setMealType] = useState('all');
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });

  const menuData = [
  {
    id: 1,
    name: "Masala Chai",
    category: "Chai Varieties",
    description: "Traditional Indian spiced tea brewed with aromatic spices, ginger, and cardamom. Served hot with a perfect balance of sweetness and spice.",
    price: 40,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1edae3c66-1765129892610.png",
    imageAlt: "Steaming cup of golden masala chai with visible spices floating on top, served in traditional clay cup on wooden table with cinnamon sticks and cardamom pods",
    isPopular: true,
    isVeg: true,
    rating: 4.8,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "breakfast"
  },
  {
    id: 2,
    name: "Adrak Chai",
    category: "Chai Varieties",
    description: "Ginger-infused tea with a warming kick. Perfect for cold evenings and soothing the throat. Made with fresh ginger root and premium tea leaves.",
    price: 45,
    image: "https://images.unsplash.com/photo-1682530016814-6a1c1311cd6e",
    imageAlt: "Hot ginger tea in transparent glass cup showing amber color with fresh ginger slices floating, placed on rustic wooden surface with ginger root beside",
    isVeg: true,
    rating: 4.7,
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealType: "breakfast"
  },
  {
    id: 3,
    name: "Elaichi Chai",
    category: "Chai Varieties",
    description: "Cardamom-flavored tea with a subtle, aromatic taste. A royal blend that refreshes your senses with every sip.",
    price: 50,
    image: "https://images.unsplash.com/photo-1641647317521-25c3a8e59414",
    imageAlt: "Elegant cardamom tea in white porcelain cup with green cardamom pods scattered around, steam rising from hot beverage on marble surface",
    isVeg: true,
    rating: 4.6,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "breakfast"
  },
  {
    id: 4,
    name: "Kulhad Chai",
    category: "Chai Varieties",
    description: "Traditional chai served in earthen clay cups (kulhad) that adds a unique earthy flavor. An authentic Indian tea experience.",
    price: 55,
    originalPrice: 65,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1edae3c66-1765129892610.png",
    imageAlt: "Traditional Indian chai served in rustic terracotta kulhad cup with visible clay texture, placed on wooden plank with tea leaves scattered around",
    isPopular: true,
    isVeg: true,
    rating: 4.9,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "breakfast"
  },
  {
    id: 5,
    name: "Samosa",
    category: "Snacks",
    description: "Crispy golden triangular pastries filled with spiced potatoes and peas. Served hot with mint and tamarind chutney.",
    price: 30,
    image: "https://images.unsplash.com/photo-1706092949227-52062b5eb190",
    imageAlt: "Golden brown crispy samosas arranged on white plate with green mint chutney and red tamarind sauce in small bowls, garnished with coriander leaves",
    isPopular: true,
    isVeg: true,
    rating: 4.7,
    dietaryInfo: ["Vegetarian"],
    mealType: "snacks"
  },
  {
    id: 6,
    name: "Bread Pakora",
    category: "Snacks",
    description: "Bread slices stuffed with spiced potato filling, coated in gram flour batter and deep-fried until golden. A perfect tea-time snack.",
    price: 40,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec",
    imageAlt: "Crispy golden bread pakoras cut diagonally showing potato filling inside, arranged on banana leaf with green chutney drizzle and red chili garnish",
    isVeg: true,
    rating: 4.5,
    dietaryInfo: ["Vegetarian"],
    mealType: "snacks"
  },
  {
    id: 7,
    name: "Aloo Tikki",
    category: "Snacks",
    description: "Crispy potato patties seasoned with aromatic spices. Served with yogurt, chutneys, and topped with sev and pomegranate.",
    price: 50,
    image: "https://images.unsplash.com/photo-1722240126789-626afd6e9fef",
    imageAlt: "Golden brown aloo tikki patties on white plate topped with white yogurt, colorful chutneys, crispy sev, and red pomegranate seeds with coriander garnish",
    isVeg: true,
    rating: 4.6,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "snacks"
  },
  {
    id: 8,
    name: "Paneer Pakora",
    category: "Snacks",
    description: "Cottage cheese cubes marinated in spices, coated with gram flour batter and deep-fried. Crispy outside, soft inside.",
    price: 80,
    image: "https://images.unsplash.com/photo-1731645575097-ede4f8b660ba",
    imageAlt: "Crispy golden paneer pakoras with visible gram flour coating on wooden serving board with green mint chutney and sliced onions on side",
    isPopular: true,
    isVeg: true,
    rating: 4.8,
    dietaryInfo: ["Vegetarian"],
    mealType: "snacks"
  },
  {
    id: 9,
    name: "Dal Makhani",
    category: "Main Course",
    description: "Creamy black lentils slow-cooked overnight with butter, cream, and aromatic spices. A rich and indulgent North Indian classic.",
    price: 180,
    image: "https://images.unsplash.com/photo-1680359869925-1efb91d82159",
    imageAlt: "Rich creamy dal makhani in traditional copper serving bowl with butter swirl on top, garnished with cream and coriander, served with naan bread on side",
    isPopular: true,
    isVeg: true,
    rating: 4.9,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "lunch"
  },
  {
    id: 10,
    name: "Paneer Butter Masala",
    category: "Main Course",
    description: "Soft cottage cheese cubes in rich, creamy tomato-based gravy with butter and aromatic spices. Best paired with naan or rice.",
    price: 200,
    image: "https://images.unsplash.com/photo-1680359869958-fbdf77a5cbc0",
    imageAlt: "Creamy orange-red paneer butter masala curry in black bowl with visible paneer cubes, garnished with cream swirl and kasuri methi leaves",
    isPopular: true,
    isVeg: true,
    rating: 4.8,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "lunch"
  },
  {
    id: 11,
    name: "Chole Bhature",
    category: "Main Course",
    description: "Spicy chickpea curry served with fluffy deep-fried bread. A hearty Punjabi favorite that\'s perfect for lunch.",
    price: 150,
    image: "https://images.unsplash.com/photo-1561041392-06b82e3135d7",
    imageAlt: "Large fluffy golden bhature bread with spicy chole chickpea curry in bowl, served with sliced onions, green chilies, and lemon wedges on steel plate",
    isVeg: true,
    rating: 4.7,
    dietaryInfo: ["Vegetarian"],
    mealType: "lunch"
  },
  {
    id: 12,
    name: "Veg Biryani",
    category: "Main Course",
    description: "Fragrant basmati rice layered with mixed vegetables, aromatic spices, and herbs. Served with raita and salan.",
    price: 180,
    image: "https://images.unsplash.com/photo-1680928592636-24ac85972137",
    imageAlt: "Colorful vegetable biryani with long grain basmati rice, visible vegetables, garnished with fried onions and fresh coriander in traditional handi pot",
    isVeg: true,
    rating: 4.6,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "dinner"
  },
  {
    id: 13,
    name: "Gulab Jamun",
    category: "Desserts",
    description: "Soft, spongy milk-solid balls deep-fried and soaked in rose-flavored sugar syrup. Served warm for the best experience.",
    price: 60,
    image: "https://images.unsplash.com/photo-1584106540739-da89566ae9f3",
    imageAlt: "Dark brown gulab jamun balls in white bowl with golden sugar syrup, garnished with silver leaf and pistachios, steam rising from warm dessert",
    isPopular: true,
    isVeg: true,
    rating: 4.8,
    dietaryInfo: ["Vegetarian"],
    mealType: "snacks"
  },
  {
    id: 14,
    name: "Ras Malai",
    category: "Desserts",
    description: "Soft cottage cheese dumplings soaked in sweetened, thickened milk flavored with cardamom and saffron. Garnished with pistachios.",
    price: 80,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1226c61fb-1766842421498.png",
    imageAlt: "White ras malai dumplings in creamy milk sauce in decorative bowl, garnished with saffron strands, chopped pistachios, and rose petals",
    isVeg: true,
    rating: 4.7,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "snacks"
  },
  {
    id: 15,
    name: "Jalebi",
    category: "Desserts",
    description: "Crispy, spiral-shaped sweet made from fermented batter, deep-fried and soaked in sugar syrup. Best enjoyed hot and fresh.",
    price: 50,
    image: "https://images.unsplash.com/photo-1708782343129-47b08cdc2329",
    imageAlt: "Bright orange spiral-shaped jalebis arranged on white plate with visible sugar syrup coating, garnished with silver leaf and pistachios",
    isVeg: true,
    rating: 4.5,
    dietaryInfo: ["Vegetarian"],
    mealType: "snacks"
  },
  {
    id: 16,
    name: "Cold Coffee",
    category: "Beverages",
    description: "Chilled coffee blended with milk, ice cream, and a touch of chocolate. Topped with whipped cream and chocolate shavings.",
    price: 90,
    image: "https://images.unsplash.com/photo-1628590044757-7c712d3e6bdb",
    imageAlt: "Tall glass of cold coffee with layers of brown coffee and white cream, topped with whipped cream and chocolate shavings, served with straw",
    isPopular: true,
    isVeg: true,
    rating: 4.7,
    dietaryInfo: ["Vegetarian"],
    mealType: "snacks"
  },
  {
    id: 17,
    name: "Mango Lassi",
    category: "Beverages",
    description: "Refreshing yogurt-based drink blended with ripe mangoes and a hint of cardamom. Perfect for hot summer days.",
    price: 80,
    image: "https://images.unsplash.com/photo-1665654232797-d6c529810788",
    imageAlt: "Creamy yellow mango lassi in tall glass with visible mango pulp, garnished with mint leaves and mango slice on rim, condensation on glass",
    isVeg: true,
    rating: 4.6,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealType: "snacks"
  },
  {
    id: 18,
    name: "Fresh Lime Soda",
    category: "Beverages",
    description: "Fizzy refreshing drink made with fresh lime juice, soda water, and a choice of sweet or salt. Instantly refreshing.",
    price: 50,
    image: "https://images.unsplash.com/photo-1565210251687-4a8f9d4a34db",
    imageAlt: "Clear glass of lime soda with ice cubes, lime slices floating, garnished with mint leaves and salt rim, bubbles visible in drink",
    isVeg: true,
    rating: 4.5,
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealType: "snacks"
  }];


  const categories = useMemo(() => {
    return [...new Set(menuData.map((item) => item.category))];
  }, []);

  const handleDietaryFilterChange = (filterName, checked) => {
    setDietaryFilters((prev) => ({
      ...prev,
      [filterName]: checked
    }));
  };

  const filteredMenuData = useMemo(() => {
    return menuData?.filter((item) => {
      const matchesSearch = item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      const matchesCategory = activeCategory === 'all' || item?.category === activeCategory;

      const matchesPriceRange = (() => {
        if (priceRange === 'all') return true;
        if (priceRange === '0-100') return item?.price < 100;
        if (priceRange === '100-200') return item?.price >= 100 && item?.price < 200;
        if (priceRange === '200-300') return item?.price >= 200 && item?.price < 300;
        if (priceRange === '300+') return item?.price >= 300;
        return true;
      })();

      const matchesMealType = mealType === 'all' || item?.mealType === mealType;

      const matchesDietary = (() => {
        if (!dietaryFilters?.vegetarian && !dietaryFilters?.vegan && !dietaryFilters?.glutenFree) return true;

        let matches = true;
        if (dietaryFilters?.vegetarian) {
          matches = matches && item?.dietaryInfo?.includes('Vegetarian');
        }
        if (dietaryFilters?.vegan) {
          matches = matches && item?.dietaryInfo?.includes('Vegan');
        }
        if (dietaryFilters?.glutenFree) {
          matches = matches && item?.dietaryInfo?.includes('Gluten-Free');
        }
        return matches;
      })();

      return matchesSearch && matchesCategory && matchesPriceRange && matchesMealType && matchesDietary;
    });
  }, [searchQuery, activeCategory, priceRange, mealType, dietaryFilters, menuData]);

  const groupedMenuData = useMemo(() => {
    const grouped = {};
    filteredMenuData?.forEach((item) => {
      if (!grouped?.[item?.category]) {
        grouped[item.category] = [];
      }
      grouped?.[item?.category]?.push(item);
    });
    return grouped;
  }, [filteredMenuData]);

  const handleWhatsAppOrder = (item) => {
    console.log('Order placed for:', item?.name);
  };

  return (
    <>
      <Helmet>
        <title>Complete Menu - ChaiPal Garden Cafe | Authentic Indian Chai & Food</title>
        <meta name="description" content="Explore our complete menu featuring traditional chai varieties, delicious snacks, main courses, and desserts. Order directly via WhatsApp for quick service." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-8 md:mb-10 lg:mb-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 md:mb-4 lg:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Complete Menu
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover our carefully curated selection of traditional Indian chai, authentic snacks, and delicious meals. Every item crafted with love and premium ingredients.
              </p>
            </div>
          </div>

          <MenuSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories} />


          <MenuFilters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            dietaryFilters={dietaryFilters}
            onDietaryFilterChange={handleDietaryFilterChange}
            mealType={mealType}
            onMealTypeChange={setMealType} />


          {filteredMenuData?.length === 0 ?
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="bg-white/75 backdrop-blur-md rounded-[18px] md:rounded-[20px] lg:rounded-[24px] shadow-lg p-8 md:p-10 lg:p-12 text-center">
                <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  No items found
                </h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            </div> :

          <div>
              {Object.entries(groupedMenuData)?.map(([category, items]) =>
            <MenuCategorySection
              key={category}
              category={category}
              items={items}
              onWhatsAppOrder={handleWhatsAppOrder} />

            )}
            </div>
          }

          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20">
            <div className="bg-primary/10 backdrop-blur-md rounded-[18px] md:rounded-[20px] lg:rounded-[24px] p-6 md:p-8 lg:p-10 text-center">
              <Icon name="Info" size={32} color="var(--color-primary)" className="mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 md:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Can't find what you're looking for?
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Contact us directly via WhatsApp or phone for special requests and custom orders.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-full text-base md:text-lg font-semibold hover:shadow-lg transition-all duration-200">

                  <Icon name="MessageCircle" size={20} />
                  WhatsApp Us
                </button>
                <button
                  onClick={() => window.location.href = 'tel:+919876543210'}
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-primary rounded-full text-base md:text-lg font-semibold hover:shadow-lg transition-all duration-200">

                  <Icon name="Phone" size={20} />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default CompleteMenuExperience;