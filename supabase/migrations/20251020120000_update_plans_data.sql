UPDATE public.plans
SET 
  name = 'Web',
  slug = 'web',
  summary = 'Modern 3–5 page website fast.',
  monthly_price = 150,
  yearly_price = 1500,
  features = '{"3–5 pages","Responsive + basic SEO","1 concept + 2 revisions","5 stock images + icons","Performance & accessibility pass","Staging preview","Delivery: 3–5 business days"}'
WHERE id = '260df6c8-2cb1-4d3a-b4f5-f3d34276e1ab';

UPDATE public.plans
SET 
  name = 'Brand Identity',
  slug = 'brand-identity',
  summary = 'Logo suite, brand kit, and templates.',
  monthly_price = 250,
  yearly_price = 2500,
  features = '{"Logo suite","Color + type system","Social kit","Business card + letterhead","3 flyer/post templates","Mini brand guide (PDF)"}'
WHERE id = '70a7e3a1-dc5d-49f9-9f8a-1d2d694c3fe1';

UPDATE public.plans
SET 
  name = 'Complete',
  slug = 'complete',
  summary = 'Website + branding handled end-to-end.',
  monthly_price = 500,
  yearly_price = 5000,
  features = '{"Everything in Web + Identity","6–10 pages","AI copy draft for key pages","SEO essentials","Launch checklist","7 day post launch tweaks"}'
WHERE id = '909f900e-137d-4d49-8715-bb665fb692e8';
