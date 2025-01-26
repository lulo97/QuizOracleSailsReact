CREATE OR REPLACE 
FUNCTION fn_translate(
    p_id VARCHAR2, 
    p_language VARCHAR2, 
    p_table VARCHAR2
)
RETURN VARCHAR2
IS
    l_count number := 0;
    l_output VARCHAR2(4000);
    l_sql VARCHAR2(4000);
BEGIN

    --Check if language exist in table
    SELECT COUNT(*) into l_count
    FROM USER_TAB_COLUMNS
    WHERE TABLE_NAME = upper(p_table)
      AND COLUMN_NAME = upper(p_language);

    if l_count = 0 then
        prc_log('No language found');
        return '';
    end if;

    --Get translated value
    l_sql := 'SELECT ' || p_language || ' FROM ' || p_table || ' WHERE id = :1';
    EXECUTE IMMEDIATE l_sql
        INTO l_output
        USING p_id;

    RETURN l_output;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN '';
    WHEN OTHERS THEN
        RETURN '';
END;
/


