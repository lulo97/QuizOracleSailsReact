CREATE OR REPLACE 
FUNCTION fn_get_error_message (p_error_code   VARCHAR2,
/* Formatted on 12-Jan-2025 22:04:52 (QP5 v5.336) */
                               p_language     VARCHAR2:= 'vi',
                               p_name         VARCHAR2:= '')
    RETURN VARCHAR2
IS
    l_output          VARCHAR2 (200);
    l_variable_name   VARCHAR2 (200);
BEGIN
    SELECT CASE
               WHEN p_language = 'vi' THEN vi
               WHEN p_language = 'en' THEN en
           END
    INTO l_output
    FROM tbl_errors
    WHERE code = p_error_code;

    IF p_name IS NOT NULL
    THEN
        SELECT CASE
                   WHEN p_language = 'vi' THEN vi
                   WHEN p_language = 'en' THEN en
               END
        INTO l_variable_name
        FROM tbl_field_declares
        WHERE name = p_name;
    END IF;

    l_output := REPLACE (l_output, ':variable', l_variable_name);

    RETURN l_output;
END;
/


