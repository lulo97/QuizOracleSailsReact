/* Formatted on 1/26/2025 10:42:05 PM (QP5 v5.326) */
CREATE OR REPLACE PROCEDURE prc_get_all_error (p_cursor IN OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN p_cursor FOR
        SELECT TBL_ERRORS.id,
               TBL_ERRORS.CODE,
               TBL_ERRORS.vi,
               TBL_ERRORS.en
          FROM TBL_ERRORS;
END;
/
