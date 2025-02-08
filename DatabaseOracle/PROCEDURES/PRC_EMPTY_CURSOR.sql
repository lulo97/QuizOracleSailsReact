/* Formatted on 2/8/2025 7:00:15 PM (QP5 v5.326) */
CREATE OR REPLACE PROCEDURE prc_empty_cursor (
    p_refcursor       IN OUT SYS_REFCURSOR,
    p_error_code      IN OUT VARCHAR2,
    p_error_message   IN OUT VARCHAR2,
    p_language        IN     VARCHAR2)
AS
BEGIN
    OPEN p_refcursor FOR SELECT *
                           FROM DUAL
                          WHERE 0 = 1;

    IF p_error_code IS NULL
    THEN
        PRC_log ('c err=' || p_error_code);
        p_error_code := '0';
    END IF;

    IF p_error_message IS NULL
    THEN
        p_error_message := fn_get_error_message (p_error_code, p_language);
    END IF;

    PRC_log ('c');
END;
/
