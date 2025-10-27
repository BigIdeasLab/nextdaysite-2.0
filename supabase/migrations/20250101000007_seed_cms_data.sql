-- Seed portfolio items (Featured Works)
insert into public.portfolio_items (title, description, slug, image_url, color, order_index, published) values
  ('EcoTrack', 'Monitor and optimize environmental impact in real-time through data analytics.', 'ecotrack', 'https://api.builder.io/api/v1/image/assets/TEMP/bcb8d48b109cabb767cfef3995a7ddbf14a6331a?width=1576', 'var(--placeholder-gray)', 1, true),
  ('HomeNest', 'Transform any space into a smart home with customizable automation options.', 'homenest', 'https://api.builder.io/api/v1/image/assets/TEMP/d1e3b79c7882105a073f340d0c30a1a900f0c949?width=1598', 'var(--placeholder-gray)', 2, true),
  ('FitFlex', 'Personalized workout and nutrition plans that adapt to user progress and feedback.', 'fitflex', 'https://api.builder.io/api/v1/image/assets/TEMP/eaf534945d725f799b9272c318be0a739d9d1f45?width=1102', 'var(--placeholder-gray)', 3, true),
  ('BlockChainEd', 'A decentralized platform for learning and sharing blockchain technology skills.', 'blockchained', 'https://api.builder.io/api/v1/image/assets/TEMP/aad2392e0bb258e9218c5d85571b5c9bf436041b?width=992', 'var(--placeholder-gray)', 4, true),
  ('TravelSphere', 'Curate unique travel experiences based on user preferences and local insights.', 'travelsphere', 'https://api.builder.io/api/v1/image/assets/TEMP/102f3110d5fdd2b33ff7050b860f9718c7afcadb?width=1600', 'var(--placeholder-gray)', 5, true),
  ('BookCaddy', 'A social platform for book lovers to share, review, and recommend their favorite reads.', 'bookcaddy', 'https://api.builder.io/api/v1/image/assets/TEMP/573c7ff44d2188cf791374291f32ab1b5507b47f?width=992', 'var(--placeholder-gray)', 6, true)
on conflict (slug) do nothing;

-- Seed services
insert into public.services (title, description, slug, image1_url, image2_url, order_index, published) values
  ('Mobile App', NULL, 'mobile-app', 'https://api.builder.io/api/v1/image/assets/TEMP/3731552d5863c43a5a2f08857cba1d69a15cb94e?width=312', 'https://api.builder.io/api/v1/image/assets/TEMP/8dff95b352e06384b2cbda0bdd8725f069cc30ad?width=312', 1, true),
  ('Website Development', NULL, 'website-development', 'https://api.builder.io/api/v1/image/assets/TEMP/bcd0a9697d8bd367df1ac05abe35fc8a1cde216a?width=312', 'https://api.builder.io/api/v1/image/assets/TEMP/b0b73585d7a96b90c669067d21eea15c1bfa8961?width=312', 2, true),
  ('Branding', NULL, 'branding', 'https://api.builder.io/api/v1/image/assets/TEMP/101deed4b9cf5b74e3e01517533eee8300027235?width=312', 'https://api.builder.io/api/v1/image/assets/TEMP/fcdaa423367af7aefa4eacc6f124258faec78c22?width=312', 3, true),
  ('Brand Guidelines', NULL, 'brand-guidelines', 'https://api.builder.io/api/v1/image/assets/TEMP/7405f57af81f2bd036a724dd4a86c7d21c28cbb4?width=312', 'https://api.builder.io/api/v1/image/assets/TEMP/f4b13c36da799c8960df0fcef21f25af1a731d02?width=312', 4, true),
  ('Visual Identity Design', NULL, 'visual-identity-design', 'https://api.builder.io/api/v1/image/assets/TEMP/fec7d66da14c0e42280dc3161f7e3da336357a21?width=312', 'https://api.builder.io/api/v1/image/assets/TEMP/50ff04a4fd137080f7e30e85d5656eb56e913d71?width=312', 5, true),
  ('CMS Integration', NULL, 'cms-integration', 'https://api.builder.io/api/v1/image/assets/TEMP/16b2c7cfd009aaad8243821ffaad2561284da536?width=312', 'https://api.builder.io/api/v1/image/assets/TEMP/bd519a768c9545511ccef3b4019d1595dc849ddc?width=312', 6, true)
on conflict (slug) do nothing;

-- Seed testimonials
insert into public.testimonials (name, quote, avatar_url, bg_color, border_color, text_color, rotate_class, position_class, order_index, published) values
  ('Sarah Chen', '"NextDaySite delivered our website in 24 hours. The AI-powered design process was incredible!"', 'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_470?width=100', '#1A1A1A', '#2B2B2B', '#9A9EA2', '-rotate-[6deg]', 'left-0 top-[70px]', 1, true),
  ('Marcus Rodriguez', '"The quality exceeded our expectations. Professional, fast, and exactly what we needed."', 'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_489?width=100', '#8181FF', '#BFBFFF', '#FFF', 'rotate-[2.217deg]', 'left-[705px] top-[65px]', 2, true),
  ('Marcus Rodriguez', '"From concept to launch in one day. Our sales increased 40% with the new design."', 'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_508?width=100', '#FF8C00', '#FFC175', '#FFF', 'rotate-[2.3deg]', 'left-[355px] top-0', 3, true),
  ('Lisa Chen', '"A seamless integration of user feedback led to a 30% boost in engagement."', 'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_527?width=100', '#8181FF', '#BFBFFF', '#FFF', 'rotate-[3.32deg]', 'left-[19px] top-[484px]', 4, true),
  ('Eddie Patel', '"Revamping our UX strategy cut down customer support queries by 25%."', 'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_546?width=100', '#1A1A1A', '#2B2B2B', '#9A9EA2', '-rotate-[0.18deg]', 'left-[378px] top-[441px]', 5, true),
  ('Sofia Gomez', '"Innovative features introduced last quarter have driven a 50% increase in subscriptions."', 'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_565?width=100', '#00A555', '#34FF9D', '#FFF', '-rotate-[2.43deg]', 'left-[719px] top-[524px]', 6, true)
on conflict do nothing;

-- Seed home page
insert into public.pages (title, slug, description, meta_title, meta_description, hero_title, hero_subtitle, published) values
  ('Home', 'home', 'NextDaySite Homepage', 'NextDaySite 2.0 - AI-Powered Website Creation', 'Own a Stunning Website Without Lifting a Finger. Get a professional website built in 24-48 hours.', 'Own a Stunning Website Without Lifting a Finger', 'Get a professional website built and designed specifically for you in 24-48 hours, powered by AI.', true)
on conflict (slug) do nothing;
