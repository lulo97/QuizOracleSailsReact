/* Formatted on 2/8/2025 7:00:15 PM (QP5 v5.326) */
CREATE OR REPLACE FUNCTION fn_translate (p_id         VARCHAR2,
                                         p_language   VARCHAR2,
                                         p_table      VARCHAR2)
    RETURN VARCHAR2
IS
    l_count      NUMBER := 0;
    l_output     VARCHAR2 (4000);
    l_sql        VARCHAR2 (4000);
    l_table      VARCHAR2 (200) := DBMS_ASSERT.simple_sql_name (p_table);
    l_language   VARCHAR2 (200) := DBMS_ASSERT.simple_sql_name (p_language);
BEGIN
    -- Check if the language column exists in the specified table
    SELECT COUNT (*)
      INTO l_count
      FROM user_tab_columns
     WHERE table_name = UPPER (l_table) AND column_name = UPPER (l_language);

    IF l_count = 0
    THEN
        prc_log ('No language found');
        RETURN p_id;                -- Exit early if the column does not exist
    END IF;

    --DBMS_ASSERT.SIMPLE_SQL_NAME = prevent sql injection
    --DBMS_ASSERT.SIMPLE_SQL_NAME = validate for table, column name

    -- Check if the record with the given ID exists in the table
    l_sql :=
           'SELECT COUNT(*) FROM '
        || l_table
        || ' WHERE '
        || l_language
        || ' IS NOT NULL and id = :1';

    EXECUTE IMMEDIATE l_sql
        INTO l_count
        USING p_id;

    IF l_count = 0
    THEN
        -- If no record exists, retrieve the "name" column value
        l_sql := 'SELECT name FROM ' || l_table || ' WHERE id = :1';

        EXECUTE IMMEDIATE l_sql
            INTO l_output
            USING p_id;

        RETURN l_output;
    END IF;

    -- Retrieve the translated value from the specified column
    l_sql :=
        'SELECT ' || l_language || ' FROM ' || l_table || ' WHERE id = :1';

    EXECUTE IMMEDIATE l_sql
        INTO l_output
        USING p_id;

    RETURN l_output;
EXCEPTION
    WHEN OTHERS
    THEN
        RETURN p_id;
END;
/
