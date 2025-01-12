CREATE OR REPLACE 
PROCEDURE prc_add (p_refcursor       OUT SYS_REFCURSOR,
/* Formatted on 12-Jan-2025 11:06:18 (QP5 v5.336) */
                   p_first_number        VARCHAR2,
                   p_second_number       VARCHAR2)
AS
BEGIN
    OPEN p_refcursor FOR
        SELECT TO_NUMBER (p_first_number) + TO_NUMBER (p_second_number) AS "data"
        FROM DUAL;
END;
/


