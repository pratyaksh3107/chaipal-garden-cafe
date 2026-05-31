-- CHAIPAL GARDEN CAFE SUPABASE SCHEMA SETUP
-- Run this script in your Supabase SQL Editor to initialize all tables, RLS policies, and seed data.

-- 1. USER PROFILES TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
    id TEXT PRIMARY KEY, -- String slug as primary key to match frontend IDs
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image TEXT,
    description TEXT,
    "isVeg" BOOLEAN NOT NULL DEFAULT true,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    recommended BOOLEAN NOT NULL DEFAULT false,
    spicy INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    guests INTEGER NOT NULL,
    seating_type TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    special_note TEXT,
    occasion TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, cancelled
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CROWD STATUS TABLE
CREATE TABLE IF NOT EXISTS public.crowd_status (
    id INTEGER PRIMARY KEY DEFAULT 1,
    current_level INTEGER NOT NULL DEFAULT 0, -- 0 = Peaceful, 1 = Moderate, 2 = Busy
    message TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
    id TEXT PRIMARY KEY, -- String slug
    title TEXT NOT NULL,
    subtitle TEXT,
    discount_percentage TEXT, -- e.g. "33% OFF"
    description TEXT,
    image TEXT,
    badge TEXT,
    emoji TEXT DEFAULT '⚡',
    active BOOLEAN NOT NULL DEFAULT true,
    expiry_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    review_text TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    approved BOOLEAN NOT NULL DEFAULT false,
    avatar TEXT,
    avatar_color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QR TABLES
CREATE TABLE IF NOT EXISTS public.qr_tables (
    id TEXT PRIMARY KEY, -- e.g. table-1
    table_number INTEGER NOT NULL,
    qr_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL, -- e.g. qr_scan, page_view, order_attempt, booking_attempt
    event_value TEXT,         -- e.g. table-1, menu, Wa-Redirect
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AI FAQ RULES TABLE
CREATE TABLE IF NOT EXISTS public.ai_faq_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL UNIQUE,
    response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ==================================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crowd_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_faq_rules ENABLE ROW LEVEL SECURITY;

-- ==================================================
-- RLS POLICIES Setup
-- ==================================================

-- User Profiles: Select profile is public or user-scoped. Write only by authenticated user.
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles 
    FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.user_profiles 
    FOR UPDATE USING (auth.uid() = id);

-- Menu Items: Public viewable, only admin modifies.
CREATE POLICY "Menu is viewable by everyone" ON public.menu_items 
    FOR SELECT USING (true);
CREATE POLICY "Admin can modify menu items" ON public.menu_items 
    FOR ALL USING (auth.role() = 'authenticated');

-- Reservations: Clients can submit (INSERT), Admins manage.
CREATE POLICY "Anyone can request a reservation" ON public.reservations 
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and manage reservations" ON public.reservations 
    FOR ALL USING (auth.role() = 'authenticated');

-- Crowd Status: Public viewable, Admin modifies.
CREATE POLICY "Crowd status is viewable by everyone" ON public.crowd_status 
    FOR SELECT USING (true);
CREATE POLICY "Admin can update crowd status" ON public.crowd_status 
    FOR ALL USING (auth.role() = 'authenticated');

-- Offers: Public viewable, Admin modifies.
CREATE POLICY "Offers are viewable by everyone" ON public.offers 
    FOR SELECT USING (true);
CREATE POLICY "Admin can manage offers" ON public.offers 
    FOR ALL USING (auth.role() = 'authenticated');

-- Reviews: Client inserts, approved reviews are public viewable, Admin manages all.
CREATE POLICY "Anyone can submit a review" ON public.reviews 
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Approved reviews are viewable by everyone" ON public.reviews 
    FOR SELECT USING (approved = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin can manage all reviews" ON public.reviews 
    FOR ALL USING (auth.role() = 'authenticated');

-- QR Tables: Public viewable, Admin modifies.
CREATE POLICY "QR tables are viewable by everyone" ON public.qr_tables 
    FOR SELECT USING (true);
CREATE POLICY "Admin can manage QR tables" ON public.qr_tables 
    FOR ALL USING (auth.role() = 'authenticated');

-- Analytics: Anyone can insert, only Admin selects.
CREATE POLICY "Anyone can log analytics events" ON public.analytics 
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view analytics" ON public.analytics 
    FOR SELECT USING (auth.role() = 'authenticated');

-- AI FAQ Rules: Public viewable, Admin modifies.
CREATE POLICY "AI FAQ rules are viewable by everyone" ON public.ai_faq_rules 
    FOR SELECT USING (true);
CREATE POLICY "Admin can manage AI FAQ rules" ON public.ai_faq_rules 
    FOR ALL USING (auth.role() = 'authenticated');

-- ==================================================
-- PRE-POPULATE SEED DATA
-- ==================================================

-- Seed Crowd Status
INSERT INTO public.crowd_status (id, current_level, message, updated_at)
VALUES (1, 0, 'Plenty of seating available. Perfect for studying or quiet work!', NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed QR Tables
INSERT INTO public.qr_tables (id, table_number) VALUES
('table-1', 1), ('table-2', 2), ('table-3', 3), ('table-4', 4),
('table-5', 5), ('table-6', 6), ('table-7', 7), ('table-8', 8),
('table-9', 9), ('table-10', 10), ('table-11', 11), ('table-12', 12)
ON CONFLICT (id) DO NOTHING;

-- Seed AI FAQ Rules
INSERT INTO public.ai_faq_rules (keyword, response) VALUES
('wifi', 'Yes! We offer free high-speed WiFi. Just ask our staff for the password! 📶'),
('parking', 'Free two-wheeler parking is available right in front of the cafe. Car parking is available across the street. 🚗'),
('hours', 'We are open from 8:00 AM to 9:00 PM every single day of the week! ⏰'),
('location', 'We are located on Goner Road, opposite the HP Petrol Pump, Jaipur. 📍'),
('discount', 'Show your student ID to our staff for a flat 15% discount on the total bill! 🎓')
ON CONFLICT (keyword) DO NOTHING;

-- Seed Special Offers
INSERT INTO public.offers (id, title, subtitle, discount_percentage, description, image, badge, emoji, active, expiry_date) VALUES
('happy-hour', 'Happy Hour Chai', 'Every day, 3:00 PM – 5:00 PM', 'TEA AT ₹20', 'Unwind during our happy hours with any artisanal hot tea of your choice for just ₹20.', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80', 'Daily Deal', '☕', true, NOW() + INTERVAL '30 days'),
('student-discount', 'Student Special Discount', 'Show your Student ID card', 'FLAT 15% OFF', 'Struggling with exams? Bring your friends, show your valid college ID, and grab 15% off the entire bill!', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', 'Student Deal', '🎓', true, NOW() + INTERVAL '90 days'),
('chai-combo', 'Chai & Samosa Combo', 'Earthy & Delicious street bites', 'COMBO @ ₹70', 'Enjoy a warm cup of authentic Kulhad Masala Chai paired with hot crispy Samosas at a special combo rate.', 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&q=80', 'Best Seller Combo', '🥟', true, NOW() + INTERVAL '45 days'),
('monsoon-treat', 'Monsoon Sizzler Deal', 'Warm up this rainy season', '10% OFF SIZZLERS', 'Order any premium paneer or veg sizzler during rainy hours and get a direct 10% discount.', 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80', 'Limited Time', '🔥', true, NOW() + INTERVAL '15 days')
ON CONFLICT (id) DO NOTHING;

-- Seed Menu Items
INSERT INTO public.menu_items (id, name, category, price, image, description, "isVeg", "isAvailable", "isBestSeller", recommended, spicy) VALUES
('kulhad-masala-chai', 'Kulhad Masala Chai', 'chai', 40.00, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80', 'Authentic Indian tea brewed with cardamom, ginger, cloves, and loose tea leaves, served in a traditional clay cup.', true, true, true, true, 0),
('cardamom-chai', 'Elaichi cutting chai', 'chai', 30.00, 'https://images.unsplash.com/photo-1594631252845-29fc458981be?w=500&q=80', 'Freshly brewed loose leaf tea with crushed green cardamom, sweet and comforting.', true, true, false, false, 0),
('rose-green-tea', 'Artisanal Rose Green Tea', 'chai', 50.00, 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=500&q=80', 'Organic Darjeeling green tea leaves infused with premium dried rose petals.', true, true, false, true, 0),
('cold-coffee-cream', 'Classic Cold Coffee with Ice Cream', 'shakes', 120.00, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80', 'Creamy, frothy cold coffee blended with milk and sugar, topped with a scoop of vanilla ice cream.', true, true, true, true, 0),
('mango-mint-shake', 'Fresh Mango Mint Shake', 'shakes', 130.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80', 'Alphonso mango pulp blended with vanilla milk and a hint of fresh garden mint.', true, true, false, false, 0),
('paneer-tikka-sandwich', 'Grilled Paneer Tikka Sandwich', 'sandwiches', 110.00, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80', 'Spiced tandoori paneer cubes stuffed with capsicum and cheese, grilled in multigrain bread.', true, true, true, true, 1),
('cheese-corn-sandwich', 'Sweet Corn & Cheese Grilled Sandwich', 'sandwiches', 95.00, 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=500&q=80', 'Creamy sweet corn kernels mixed with mozzarella cheese and black pepper, grilled to golden brown.', true, true, false, false, 0),
('tadka-maggi', 'Chaipal Special Veg Tadka Maggi', 'maggi', 70.00, 'https://images.unsplash.com/photo-1612966608967-3092b74ae307?w=500&q=80', 'Maggi noodles tossed with onions, tomatoes, green peas, and double spice tastemaker with butter tadka.', true, true, true, true, 2),
('cheese-garlic-maggi', 'Cheesy Garlic Maggi', 'maggi', 85.00, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80', 'Classic maggi loaded with liquid cheese, chopped garlic, chili flakes, and oregano.', true, true, false, false, 1),
('pink-sauce-pasta', 'Penne in Creamy Pink Sauce', 'pasta', 160.00, 'https://images.unsplash.com/photo-1563379971899-660589a01cd3?w=500&q=80', 'Penne pasta tossed in a perfect mix of rich red tomato sauce and creamy white Alfredo sauce with mushrooms and olives.', true, true, false, true, 1),
('garden-fresh-pizza', 'Double Cheese Garden Fresh Pizza', 'pizza', 190.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', 'Hand-stretched thin crust pizza loaded with bell peppers, sweet corn, onions, black olives, and premium mozzarella.', true, true, true, true, 0),
('tandoori-paneer-pizza', 'Spicy Tandoori Paneer Pizza', 'pizza', 220.00, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80', 'Wood-fired style pizza crust topped with marinated paneer, red onions, green chilies, and coriander leaves.', true, true, true, false, 2),
('veg-sizzler', 'Chaipal Garden Special Veg Sizzler', 'sizzlers', 270.00, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80', 'Steaming hot sizzler plate containing herb rice, grilled vegetables, french fries, and paneer cutlet in hot garlic sauce.', true, true, false, true, 1),
('brownie-sizzler', 'Sizzling Chocolate Brownie', 'specials', 160.00, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80', 'A warm walnut chocolate brownie placed on a hot iron plate, topped with vanilla ice cream and sizzling hot fudge.', true, true, true, true, 0)
ON CONFLICT (id) DO NOTHING;

-- Seed Testimonials
INSERT INTO public.reviews (customer_name, review_text, rating, approved, avatar, avatar_color, created_at) VALUES
('Pooja Sen', 'Chaipal has the absolute best Masala Chai in Jaipur! The garden seating is extremely peaceful and green. Love the vibe here.', 5, true, 'P', '#2D4A27', NOW() - INTERVAL '3 days'),
('Rohan Verma', 'The Tadka Maggi and Double Cheese Pizza are delicious. Very reasonable pricing and great music. Highly recommended place for study sessions.', 5, true, 'R', '#8B4513', NOW() - INTERVAL '7 days'),
('Aditi Sharma', 'Absolutely amazing place. The sizzling brownie is a must-try. The staff is polite, and the service is super fast.', 4, true, 'A', '#D4AF37', NOW() - INTERVAL '10 days')
ON CONFLICT DO NOTHING;
