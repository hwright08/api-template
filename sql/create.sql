CREATE EXTENSION pgcrypto;

CREATE SCHEMA IF NOT EXISTS cfi;

CREATE TABLE cfi.user (
  user_id        SERIAL PRIMARY KEY,
  email     TEXT NOT NULL UNIQUE,
  password  TEXT NOT NULL
);

CREATE TABLE cfi.rating (
  rating_id  SERIAL PRIMARY KEY,
  select_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL
);
COMMENT ON TABLE cfi.rating IS 'The possible student ratings';
COMMENT ON COLUMN rating.select_key IS 'A unique value to be used in place of an ID if applicable';
COMMENT ON COLUMN rating.title IS 'The readable text';

CREATE TABLE cfi.lesson_type (
  lesson_type_id SERIAL PRIMARY KEY,
  select_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL
);
COMMENT ON TABLE cfi.lesson_type IS 'The possible lesson types';
COMMENT ON COLUMN lesson_type.select_key IS 'A unique value to be used in place of an ID if applicable';
COMMENT ON COLUMN lesson_type.title IS 'The readable text';

CREATE TABLE cfi.lesson (
  lesson_id SERIAL PRIMARY KEY,
  rating_id INTEGER NOT NULL,
  lesson_type_id INTEGER NOT NULL,
  stage_number INTEGER NOT NULL,
  lesson_number INTEGER,
  tco_page_number INTEGER,
  title TEXT,
  CONSTRAINT lesson_rating_id_fk FOREIGN KEY (rating_id) REFERENCES cfi.rating (rating_id),
  CONSTRAINT lesson__lesson_type_id_fk FOREIGN KEY (lesson_type_id) REFERENCES cfi.lesson_type (lesson_type_id)
);
COMMENT ON TABLE cfi.lesson IS 'The information for each lesson';
COMMENT ON COLUMN lesson.lesson_type_id IS 'The related ID distinguishing the type of lesson';
COMMENT ON COLUMN lesson.stage_number IS 'The number for the stage';
COMMENT ON COLUMN lesson.lesson_number IS 'The number for the associated lesson';
COMMENT ON COLUMN lesson.tco_page_number IS 'The page number in the TCO that has this lesson';
COMMENT ON COLUMN lesson.title IS 'Descriptive text for the particular lesson. Make sure to have a title when the lesson is a stage check or other exam.';

CREATE TABLE cfi.student (
  student_id      SERIAL PRIMARY KEY,
  student_name    TEXT NOT NULL,
  is_active       BOOLEAN DEFAULT TRUE,
  notes           TEXT,
  instructor_id   INTEGER NOT NULL,
  add_by_id       INTEGER NOT NULL,
  add_ts          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  mod_by_id       INTEGER NOT NULL,
  mod_ts          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT student__instructor_id_fk FOREIGN KEY (instructor_id) REFERENCES cfi.user (user_id),
  CONSTRAINT student__add_by_id_fk FOREIGN KEY (add_by_id) REFERENCES cfi.user (user_id),
  CONSTRAINT student__mod_by_id_fk FOREIGN KEY (mod_by_id) REFERENCES cfi.user (user_id)
);

CREATE TABLE cfi.student_rating_map (
  student_rating_map_id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  rating_id INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  add_by_id       INTEGER NOT NULL,
  add_ts          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  mod_by_id       INTEGER NOT NULL,
  mod_ts          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT student_rating_map__student_id FOREIGN KEY (student_id) REFERENCES cfi.student (student_id),
  CONSTRAINT student_rating_map__rating_id FOREIGN KEY (rating_id) REFERENCES cfi.rating (rating_id),
  CONSTRAINT student_rating_map__add_by_id_fk FOREIGN KEY (add_by_id) REFERENCES cfi.user (user_id),
  CONSTRAINT student_rating_map__mod_by_id_fk FOREIGN KEY (mod_by_id) REFERENCES cfi.user (user_id)
);

CREATE TABLE cfi.student_lesson_map (
  student_lesson_map_id SERIAL PRIMARY KEY,
  student_id  INTEGER NOT NULL,
  lesson_id   INTEGER NOT NULL,
  notes       TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  scheduled_date DATE,
  add_by_id       INTEGER NOT NULL,
  add_ts          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  mod_by_id       INTEGER NOT NULL,
  mod_ts          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT student_lesson_map__lesson_id_fk FOREIGN KEY (lesson_id) REFERENCES cfi.lesson (lesson_id),
  CONSTRAINT student_lesson_map__student_id_fk FOREIGN KEY (student_id) REFERENCES cfi.student (student_id),
  CONSTRAINT student_lesson_map__add_by_id_fk FOREIGN KEY (add_by_id) REFERENCES cfi.user (user_id),
  CONSTRAINT student_lesson_map__mod_by_id_fk FOREIGN KEY (mod_by_id) REFERENCES cfi.user (user_id)
);
