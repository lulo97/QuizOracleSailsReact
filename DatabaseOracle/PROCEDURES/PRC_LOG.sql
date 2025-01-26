/* Formatted on 1/26/2025 10:42:05 PM (QP5 v5.326) */
CREATE OR REPLACE PROCEDURE prc_log (p_content VARCHAR2)
AS
    l_sqlcode   VARCHAR2 (200);
    l_sqlerrm   VARCHAR2 (200);
    l_trace     VARCHAR2 (4000);
    l_stack     VARCHAR2 (4000);
BEGIN
    -- Primary Insert: Attempt to log the content
    INSERT INTO tbl_logs (id, logtime, content)
         VALUES (tbl_logs_sequence.NEXTVAL, CURRENT_TIMESTAMP, p_content);

    COMMIT;
EXCEPTION
    WHEN OTHERS
    THEN
        l_sqlcode := SQLCODE;
        l_sqlerrm := SQLERRM;
        l_trace := DBMS_UTILITY.format_error_backtrace;
        l_stack := DBMS_UTILITY.format_error_stack;

        -- Handle any exception by logging the error details
        INSERT INTO tbl_logs (id, logtime, content)
                 VALUES (
                     tbl_logs_sequence.NEXTVAL,
                     CURRENT_TIMESTAMP,
                        'Error: '
                     || l_sqlcode
                     || ', Code: '
                     || l_sqlerrm
                     || ', Backtrace: '
                     || l_trace
                     || ', Stack: '
                     || l_stack);

        COMMIT;
END;
/
