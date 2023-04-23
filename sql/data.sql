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
