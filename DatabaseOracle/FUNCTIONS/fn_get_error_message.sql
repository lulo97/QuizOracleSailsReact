CREATE OR REPLACE 
FUNCTION fn_get_error_message (p_error_code   VARCHAR2,
/* Formatted on 12-Jan-2025 16:52:06 (QP5 v5.336) */
                               p_language     VARCHAR2:= 'vi',
                               p_variable     VARCHAR2)
    RETURN VARCHAR2
IS
    l_output   VARCHAR2 (200);
BEGIN
    SELECT CASE
               WHEN p_language = 'vi' THEN vi
               WHEN p_language = 'en' THEN en
           END
    INTO l_output
    FROM tbl_errors;

    l_output := REPLACE (l_output, ':variable', p_variable);

    RETURN l_output;
END;
/


