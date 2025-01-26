/* Formatted on 1/26/2025 10:42:04 PM (QP5 v5.326) */
CREATE OR REPLACE FUNCTION fn_get_error_message (
    p_error_code   VARCHAR2,
    p_language     VARCHAR2:= 'vi',
    p_name         VARCHAR2:= '')
    RETURN VARCHAR2
IS
    l_output          VARCHAR2 (200);
    l_log             VARCHAR2 (4000);
    l_variable_name   VARCHAR2 (200);
BEGIN
    PRC_LOG (p_error_code || ',' || p_language);

    SELECT CASE
               WHEN p_language = 'vi' THEN vi
               WHEN p_language = 'en' THEN en
           END
      INTO l_output
      FROM tbl_errors
     WHERE TO_CHAR (code) = TO_CHAR (p_error_code);

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
EXCEPTION
    WHEN OTHERS
    THEN
        l_log := l_log || 'SQLERRM=' || SQLERRM || ',';
        l_log :=
            l_log || 'TRACE=' || DBMS_UTILITY.format_error_backtrace || ',';
        prc_log (l_log);
        RETURN p_name;
END;
/
