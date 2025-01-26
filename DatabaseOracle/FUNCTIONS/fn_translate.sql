/* Formatted on 1/26/2025 10:42:04 PM (QP5 v5.326) */
CREATE OR REPLACE FUNCTION fn_translate (p_id         VARCHAR2,
                                         p_language   VARCHAR2,
                                         p_table      VARCHAR2)
    RETURN VARCHAR2
IS
    l_count    NUMBER := 0;
    l_output   VARCHAR2 (4000);
    l_sql      VARCHAR2 (4000);
BEGIN
    --Check if language exist in table
    SELECT COUNT (*)
      INTO l_count
      FROM USER_TAB_COLUMNS
     WHERE TABLE_NAME = UPPER (p_table) AND COLUMN_NAME = UPPER (p_language);

    IF l_count = 0
    THEN
        prc_log ('No language found');
        RETURN '';
    END IF;

    --Get translated value
    l_sql :=
        'SELECT ' || p_language || ' FROM ' || p_table || ' WHERE id = :1';

    EXECUTE IMMEDIATE l_sql
        INTO l_output
        USING p_id;

    RETURN l_output;
EXCEPTION
    WHEN NO_DATA_FOUND
    THEN
        RETURN '';
    WHEN OTHERS
    THEN
        RETURN '';
END;
/
