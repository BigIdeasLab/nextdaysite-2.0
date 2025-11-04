INSERT INTO about_page_content (
    hero_main_headline, hero_image_1_url, hero_image_1_alt, hero_image_2_url, hero_image_2_alt,
    intro_headline, intro_paragraph, intro_image_url, intro_image_alt,
    promise_main_headline, promise_who_we_are_headline, promise_description,
    promise_clients_value, promise_clients_label, promise_websites_value, promise_websites_label,
    promise_satisfaction_value, promise_satisfaction_label,
    promise_image_1_url, promise_image_1_alt, promise_image_2_url, promise_image_2_alt,
    solution_main_headline, solution_our_solution_headline, solution_paragraph,
    solution_image_1_url, solution_image_1_alt, solution_image_2_url, solution_image_2_alt,
    process_headline, process_steps
) VALUES (
    -- AboutHero
    'We develop visually-appealing websites loaded with lead generation and conversion features',
    'https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576',
    'Portfolio showcase 1',
    'https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598',
    'Portfolio showcase 2',

    -- AboutIntro
    'About Us',
    'Nextdaysite was founded in 1999 with a mission to empower brands with functional websites that add significant value to any project. In today''''s digital age, this is needed to set apart any brand from its rivals, while solidifying their digital footprints.',
    'https://api.builder.io/api/v1/image/assets/TEMP/e36e2b43c3d28ca7d538dff4c6098a33ca0bf71e',
    'About NextDaySite',

    -- AboutPromise
    'We promise to work hand in hand with you to deliver results you truly deserve.',
    'Who we Are',
    'Your vision, combined with our expertise in creating excellent web solutions is guaranteed to create an exceptional website or mobile app that suits your brand and business needs. You can also be assured of innovations that stand out from the norm. This is because we don''''t create plain platforms at NDS. We create online experiences that keep our clients satisfied and their customers coming back for more.',
    '100+', 'Clients',
    '250+', 'Website Developed',
    '95%', 'Satisfaction Rate',
    'https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576',
    'Portfolio showcase 1',
    'https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598',
    'Portfolio showcase 2',

    -- AboutSolution
    'Delivering Digital Solutions Fast, Reliable, and Exceptional',
    'Our Solution',
    'At NextDaySite, we pride in providing high-quality solutions through a seamless development process and a proven record of timely delivery. With us, you can be confident in getting aesthetically impressive, user-friendly, and secure websites and mobile apps — built to perform and designed to stand out.',
    'https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576',
    'Portfolio showcase 1',
    'https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598',
    'Portfolio showcase 2',

    -- AboutProcess
    'Our Process',
    '[
        {"number": "1.", "title": "Consultation", "description": "Our process begins with a free consultation to understand clients'''' needs and expectations. We also offer advice based on technical expertise at this stage."},
        {"number": "2.", "title": "Implementation", "description": "We design and execute the demands of our clients in a timely fashion, paying attention to even the smallest details."},
        {"number": "3.", "title": "Development", "description": "From 3D graphics to mobile app solutions, we provide the final touches to the requests of the clients. Our primary target here is utter perfection."},
        {"number": "4.", "title": "Delivery", "description": "The unveiling stage. We look forward to the smiles and the ''''Wow!'''' exclamation our clients give when they see our results."}
    ]'::jsonb
);