CREATE FUNCTION comment_stats () returns jsonb AS $$
select
    coalesce(jsonb_object(array_agg(slug)), '{}')
from
    (
        select
            slug,
            count(slug)
        from
            "comment"
        group by
            slug
    ) as get_counts $$ language sql stable;
    
----
    
CREATE OR REPLACE view comment_thread() returns jsonb AS $$
  select
    coalesce(jsonb_agg(
      comment_tree(comment_id)
      order by c."date" desc
    ), '[]') as "comment"
  from "comment" c
  where c.parent_id is null
    and c.slug = comment_thread.slug
$$ language sql stable;

create function comment_tree(
  comment_id int
) returns jsonb as $$
  select jsonb_build_object(
    'comment_id', c.comment_id,
    'user', jsonb_build_object(
      'name', u.name,
      'image', u.image,
      'user_id', u.user_id
    ),
    'body', "body",
    'date', c."date",
    'replies', replies
  )
  from "comment" c
    left join "user" u using(user_id),
    lateral (
      select
        coalesce(jsonb_agg(
          comment_tree("comment".comment_id)
          order by "date" asc
        ), '[]') as replies
      from "comment"
      where parent_id = c.comment_id
    ) as get_replies
  where
    c.comment_id = comment_tree.comment_id
$$ language sql stable;

---




CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- The `nanoid()` function generates a compact, URL-friendly unique identifier.
-- Based on the given size and alphabet, it creates a randomized string that's ideal for
-- use-cases requiring small, unpredictable IDs (e.g., URL shorteners, generated file names, etc.).
-- While it comes with a default configuration, the function is designed to be flexible,
-- allowing for customization to meet specific needs.
DROP FUNCTION IF EXISTS nanoid(int, text, float);
CREATE OR REPLACE FUNCTION nanoid(
    size int DEFAULT 7, -- The number of symbols in the NanoId String. Must be greater than 0.
    alphabet text DEFAULT '←⟵🡐→⟶🡒↑↓↕߀߁߂߃߄߅߆߇߈߉۱۲۳۴۵۶۷۸ʦʧʨʩʪʫʬؼؽؾؿفقكلمنهʖʗʘʙʚʛʜʝʞʟʠʡʢʣ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', -- The symbols used in the NanoId String. Must contain between 1 and 255 symbols.
    additionalBytesFactor float DEFAULT 1.13 -- The additional bytes factor used for calculating the step size. Must be equal or greater then 1.
)
    RETURNS text -- A randomly generated NanoId String
    LANGUAGE plpgsql
    VOLATILE
    PARALLEL SAFE
    -- Uncomment the following line if you have superuser privileges
    --LEAKPROOF
AS
$$
DECLARE
    alphabetArray  text[];
    alphabetLength int := 64;
    mask           int := 63;
    step           int := 34;
BEGIN
    IF size IS NULL OR size < 1 THEN
        RAISE EXCEPTION 'The size must be defined and greater than 0!';
    END IF;

    IF alphabet IS NULL OR length(alphabet) = 0 OR length(alphabet) > 255 THEN
        RAISE EXCEPTION 'The alphabet can''t be undefined, zero or bigger than 255 symbols!';
    END IF;

    IF additionalBytesFactor IS NULL OR additionalBytesFactor < 1 THEN
        RAISE EXCEPTION 'The additional bytes factor can''t be less than 1!';
    END IF;

    alphabetArray := regexp_split_to_array(alphabet, '');
    alphabetLength := array_length(alphabetArray, 1);
    mask := (2 << cast(floor(log(alphabetLength - 1) / log(2)) as int)) - 1;
    step := cast(ceil(additionalBytesFactor * mask * size / alphabetLength) AS int);

    IF step > 1024 THEN
        step := 1024; -- The step size % can''t be bigger then 1024!
    END IF;

    RETURN nanoid_optimized(size, alphabet, mask, step);
END
$$;

-- Generates an optimized random string of a specified size using the given alphabet, mask, and step.
-- This optimized version is designed for higher performance and lower memory overhead.
-- No checks are performed! Use it only if you really know what you are doing.
DROP FUNCTION IF EXISTS nanoid_optimized(int, text, int, int);
CREATE OR REPLACE FUNCTION nanoid_optimized(
    size int, -- The desired length of the generated string.
    alphabet text, -- The set of characters to choose from for generating the string.
    mask int, -- The mask used for mapping random bytes to alphabet indices. Should be `(2^n) - 1` where `n` is a power of 2 less than or equal to the alphabet size.
    step int -- The number of random bytes to generate in each iteration. A larger value may speed up the function but increase memory usage.
)
    RETURNS text -- A randomly generated NanoId String
    LANGUAGE plpgsql
    VOLATILE
    PARALLEL SAFE
    -- Uncomment the following line if you have superuser privileges
    --LEAKPROOF
AS
$$
DECLARE
    idBuilder      text := '';
    counter        int  := 0;
    bytes          bytea;
    alphabetIndex  int;
    alphabetArray  text[];
    alphabetLength int  := 64;
BEGIN
    alphabetArray := regexp_split_to_array(alphabet, '');
    alphabetLength := array_length(alphabetArray, 1);

    LOOP
        bytes := gen_random_bytes(step);
        FOR counter IN 0..step - 1
            LOOP
                alphabetIndex := (get_byte(bytes, counter) & mask) + 1;
                IF alphabetIndex <= alphabetLength THEN
                    idBuilder := idBuilder || alphabetArray[alphabetIndex];
                    IF length(idBuilder) = size THEN
                        RETURN idBuilder;
                    END IF;
                END IF;
            END LOOP;
    END LOOP;
END
$$;