INSERT INTO cfi.rating (select_key, title)
VALUES
  ('private',           'Private'),
  ('private_add_on',    'Private Add-On'),
  ('commercial',        'Commercial'),
  ('commercial_add_on', 'Commercial Add-On'),
  ('instrument',        'Instrument'),
  ('instrument_add_on', 'Instrument Add-On'),
  ('cfi',               'CFI'),
  ('cfi_add_on',        'CFI Add-On'),
  ('cfii',              'CFII'),
  ('cfii_add_on',       'CFII Add-On'),
  ('atp',               'ATP'),
  ('atp_add_on',        'ATP Add-On');


INSERT INTO cfi.lesson_type (select_key, title)
VALUES
  ('ground', 'Ground'),
  ('flight', 'Flight');

INSERT INTO cfi.lesson (rating_id, lesson_type_id, stage_number, lesson_number, tco_page_number, title)
VALUES
  -- Private Ground
  (1, 1, 1, 1, 8,  null),
  (1, 1, 1, 2, 9,  null),
  (1, 1, 1, 3, 10, null),
  (1, 1, 1, 4, 11, null),
  (1, 1, 1, 5, 12, null),
  (1, 1, 1, 6, 13, null),
  (1, 1, 1, 7, 14, 'Stage Check'),
  (1, 1, 2, 1, 16, null),
  (1, 1, 2, 2, 17, null),
  (1, 1, 2, 3, 18, null),
  (1, 1, 2, 4, 19, 'Stage Check'),
  (1, 1, 3, 1, 21, null),
  (1, 1, 3, 2, 22, null),
  (1, 1, 3, 3, 23, null),
  (1, 1, 3, 4, 24, null),
  (1, 1, 3, 5, 25, 'Stage Check'),
  (1, 1, 4, 1, 27, null),
  (1, 1, 4, 2, 28, null),
  (1, 1, 4, 3, 29, null),
  (1, 1, 4, 4, 30, 'Stage Check'),
  (1, 1, 4, 5, 30, 'Final Exam'),

  -- Private Flight
  (1, 2, 1, 1,  32, null),
  (1, 2, 1, 2,  33, null),
  (1, 2, 1, 3,  34, null),
  (1, 2, 1, 4,  35, null),
  (1, 2, 1, 5,  36, null),
  (1, 2, 1, 6,  37, null),
  (1, 2, 1, 7,  38, null),
  (1, 2, 1, 8,  39, null),
  (1, 2, 1, 9,  40, null),
  (1, 2, 1, 10, 41, null),
  (1, 2, 1, 11, 42, null),
  (1, 2, 1, 12, 43, null),
  (1, 2, 1, 13, 44, null),
  (1, 2, 1, 14, 45, null),
  (1, 2, 1, 15, 46, null),
  (1, 2, 1, 16, 47, null),
  (1, 2, 1, 17, 48, 'Stage Check'),
  (1, 2, 2, 1, 50, null),
  (1, 2, 2, 2, 51, null),
  (1, 2, 2, 3, 52, null),
  (1, 2, 2, 4, 53, null),
  (1, 2, 2, 5, 54, null),
  (1, 2, 2, 6, 55, null),
  (1, 2, 2, 7, 56, 'Stage Check'),
  (1, 2, 3, 1, 58, null),
  (1, 2, 3, 2, 59, null),
  (1, 2, 3, 3, 60, null),
  (1, 2, 3, 4, 61, null),
  (1, 2, 3, 5, 62, 'Stage Check'),
  (1, 2, 4, 1, 64, null),
  (1, 2, 4, 2, 64, null),
  (1, 2, 4, 3, 65, 'Stage Check'),
  (1, 2, 4, 4, 65, 'End of Course Check');
