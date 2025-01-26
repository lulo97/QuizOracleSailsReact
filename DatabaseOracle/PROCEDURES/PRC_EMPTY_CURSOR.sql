/* Formatted on 1/26/2025 10:42:05 PM (QP5 v5.326) */
CREATE OR REPLACE PROCEDURE prc_empty_cursor (
    p_refcursor   IN OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN p_refcursor FOR SELECT *
                           FROM DUAL
                          WHERE 0 = 1;
END;
/
