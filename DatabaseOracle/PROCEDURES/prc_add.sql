/* Formatted on 1/26/2025 10:42:05 PM (QP5 v5.326) */
CREATE OR REPLACE PROCEDURE prc_add (p_refcursor       OUT SYS_REFCURSOR,
                                     p_first_number        VARCHAR2,
                                     p_second_number       VARCHAR2)
AS
BEGIN
    OPEN p_refcursor FOR
        SELECT TO_NUMBER (p_first_number) + TO_NUMBER (p_second_number)
                   AS "data"
          FROM DUAL;
END;
/
