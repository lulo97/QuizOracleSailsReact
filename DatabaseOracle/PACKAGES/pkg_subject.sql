/* Formatted on 1/27/2025 10:36:14 PM (QP5 v5.326) */
CREATE OR REPLACE PACKAGE pkg_subject
IS
    PROCEDURE prc_crud (p_refcursor       OUT SYS_REFCURSOR,
                        p_action              VARCHAR2,
                        p_id                  VARCHAR2,
                        p_name                VARCHAR2,
                        p_description         VARCHAR2,
                        p_parent_id           VARCHAR2,
                        p_language            VARCHAR2,
                        p_error_code      OUT VARCHAR2,
                        p_error_message   OUT VARCHAR2);

    PROCEDURE prc_read (p_refcursor       OUT SYS_REFCURSOR,
                        p_obj                 pkg_type.obj,
                        p_language            VARCHAR2,
                        p_error_code      OUT VARCHAR2,
                        p_error_message   OUT VARCHAR2);

    PROCEDURE prc_create (p_refcursor       OUT SYS_REFCURSOR,
                          p_obj                 pkg_type.obj,
                          p_language            VARCHAR2,
                          p_error_code      OUT VARCHAR2,
                          p_error_message   OUT VARCHAR2);

    PROCEDURE prc_update (p_refcursor       OUT SYS_REFCURSOR,
                          p_obj                 pkg_type.obj,
                          p_language            VARCHAR2,
                          p_error_code      OUT VARCHAR2,
                          p_error_message   OUT VARCHAR2);

    PROCEDURE prc_delete (p_refcursor       OUT SYS_REFCURSOR,
                          p_obj                 pkg_type.obj,
                          p_language            VARCHAR2,
                          p_error_code      OUT VARCHAR2,
                          p_error_message   OUT VARCHAR2);
END;
/


/* Formatted on 1/27/2025 10:36:14 PM (QP5 v5.326) */
CREATE OR REPLACE PACKAGE BODY pkg_subject
IS
    PROCEDURE prc_read (p_refcursor       OUT SYS_REFCURSOR,
                        p_obj                 pkg_type.obj,
                        p_language            VARCHAR2,
                        p_error_code      OUT VARCHAR2,
                        p_error_message   OUT VARCHAR2)
    IS
        l_log   VARCHAR2 (4000);
    BEGIN
        OPEN p_refcursor FOR
            SELECT s.id
                       AS "id",
                   fn_translate (s.id, p_language, 'SUBJECTS')
                       AS "name",
                   s.description
                       AS "description",
                   s.parent_id
                       AS "parentId"
              FROM subjects s;

        RETURN;

        p_error_code := '0';
        p_error_message := fn_get_error_message (p_error_code, p_language);
    EXCEPTION
        WHEN OTHERS
        THEN
            l_log := l_log || 'SQLERRM=' || SQLERRM || ',';
            l_log :=
                   l_log
                || 'TRACE='
                || DBMS_UTILITY.format_error_backtrace
                || ',';
            prc_log (l_log);
            prc_empty_cursor (p_refcursor,
                              p_error_code,
                              p_error_message,
                              p_language);
    END;

    PROCEDURE prc_create (p_refcursor       OUT SYS_REFCURSOR,
                          p_obj                 pkg_type.obj,
                          p_language            VARCHAR2,
                          p_error_code      OUT VARCHAR2,
                          p_error_message   OUT VARCHAR2)
    IS
        l_count   NUMBER;
        l_log     VARCHAR2 (4000);
        l_id      NUMBER := NVL (p_obj ('id'), subjects_sequence.NEXTVAL);
    BEGIN
        --Check id exist
        SELECT COUNT (*)
          INTO l_count
          FROM subjects
         WHERE id = p_obj ('id');

        IF l_count > 0
        THEN
            p_error_code := '-1';
            RAISE pkg_const.exception_unknown;
        END IF;

        --Check name exist
        SELECT COUNT (*)
          INTO l_count
          FROM subjects
         WHERE name = p_obj ('name');

        IF l_count > 0
        THEN
            p_error_code := '-3';
            p_error_message :=
                fn_get_error_message (p_error_code, p_language, 'name');
            RAISE pkg_const.exception_unknown;
        END IF;

        --Insert
        INSERT INTO subjects (id,
                              name,
                              description,
                              parent_id)
             VALUES (l_id,
                     p_obj ('name'),
                     p_obj ('description'),
                     p_obj ('parent_id'));

        p_error_code := '0';

        prc_empty_cursor (p_refcursor,
                          p_error_code,
                          p_error_message,
                          p_language);
    EXCEPTION
        WHEN OTHERS
        THEN
            l_log := l_log || 'SQLERRM=' || SQLERRM || ',';
            l_log :=
                   l_log
                || 'TRACE='
                || DBMS_UTILITY.format_error_backtrace
                || ',';
            prc_log (l_log);
            prc_empty_cursor (p_refcursor,
                              p_error_code,
                              p_error_message,
                              p_language);
    END;

    PROCEDURE prc_delete (p_refcursor       OUT SYS_REFCURSOR,
                          p_obj                 pkg_type.obj,
                          p_language            VARCHAR2,
                          p_error_code      OUT VARCHAR2,
                          p_error_message   OUT VARCHAR2)
    IS
        l_count   NUMBER := 0;
        l_log     VARCHAR2 (4000);
    BEGIN
        --Check id exist
        SELECT COUNT (*)
          INTO l_count
          FROM subjects
         WHERE id = p_obj ('id');

        IF l_count = 0
        THEN
            p_error_code := '2';
            PRC_log ('a err=' || p_error_code);
            RAISE pkg_const.exception_unknown;
        END IF;

        --Delete
        DELETE subjects
         WHERE id = p_obj ('id');

        p_error_code := '0';

        prc_empty_cursor (p_refcursor,
                          p_error_code,
                          p_error_message,
                          p_language);
    EXCEPTION
        WHEN OTHERS
        THEN
            PRC_log ('b err=' || p_error_code);
            l_log := l_log || 'SQLERRM=' || SQLERRM || ',';
            l_log :=
                   l_log
                || 'TRACE='
                || DBMS_UTILITY.format_error_backtrace
                || ',';
            prc_log (l_log);
            prc_empty_cursor (p_refcursor,
                              p_error_code,
                              p_error_message,
                              p_language);
    END;

    PROCEDURE prc_update (p_refcursor       OUT SYS_REFCURSOR,
                          p_obj                 pkg_type.obj,
                          p_language            VARCHAR2,
                          p_error_code      OUT VARCHAR2,
                          p_error_message   OUT VARCHAR2)
    IS
        l_count   NUMBER := 0;
        l_log     VARCHAR2 (4000);
    BEGIN
        --Check id exist
        SELECT COUNT (*)
          INTO l_count
          FROM subjects
         WHERE id = p_obj ('id');

        IF l_count = 0
        THEN
            p_error_code := '2';

            RAISE pkg_const.exception_unknown;
        END IF;

        --Check name exist except current record
        SELECT COUNT (*)
          INTO l_count
          FROM subjects
         WHERE name = p_obj ('name') AND id <> p_obj ('id');

        IF l_count > 0
        THEN
            p_error_code := '-3';
            p_error_message :=
                fn_get_error_message (p_error_code, p_language, 'name');
            RAISE pkg_const.exception_unknown;
        END IF;

        --Update
        UPDATE subjects
           SET name = p_obj ('name'),
               description = p_obj ('description'),
               parent_id = p_obj ('parent_id')
         WHERE id = p_obj ('id');

        p_error_code := '0';

        prc_empty_cursor (p_refcursor,
                          p_error_code,
                          p_error_message,
                          p_language);
    EXCEPTION
        WHEN OTHERS
        THEN
            l_log := l_log || 'SQLERRM=' || SQLERRM || ',';
            l_log :=
                   l_log
                || 'TRACE='
                || DBMS_UTILITY.format_error_backtrace
                || ',';
            prc_log (l_log);
            prc_empty_cursor (p_refcursor,
                              p_error_code,
                              p_error_message,
                              p_language);
    END;

    PROCEDURE prc_crud (p_refcursor       OUT SYS_REFCURSOR,
                        p_action              VARCHAR2,
                        p_id                  VARCHAR2,
                        p_name                VARCHAR2,
                        p_description         VARCHAR2,
                        p_parent_id           VARCHAR2,
                        p_language            VARCHAR2,
                        p_error_code      OUT VARCHAR2,
                        p_error_message   OUT VARCHAR2)
    AS
        obj     pkg_type.obj;
        l_log   VARCHAR2 (4000);
    BEGIN
        obj ('id') := p_id;
        obj ('name') := p_name;
        obj ('description') := p_description;
        obj ('parent_id') := p_parent_id;

        IF p_action = 'READ'
        THEN
            prc_read (p_refcursor       => p_refcursor,
                      p_obj             => obj,
                      p_language        => p_language,
                      p_error_code      => p_error_code,
                      p_error_message   => p_error_message);
        END IF;

        IF p_action = 'CREATE'
        THEN
            prc_create (p_refcursor       => p_refcursor,
                        p_obj             => obj,
                        p_language        => p_language,
                        p_error_code      => p_error_code,
                        p_error_message   => p_error_message);
        END IF;

        IF p_action = 'UPDATE'
        THEN
            prc_update (p_refcursor       => p_refcursor,
                        p_obj             => obj,
                        p_language        => p_language,
                        p_error_code      => p_error_code,
                        p_error_message   => p_error_message);
        END IF;

        IF p_action = 'DELETE'
        THEN
            prc_delete (p_refcursor       => p_refcursor,
                        p_obj             => obj,
                        p_language        => p_language,
                        p_error_code      => p_error_code,
                        p_error_message   => p_error_message);
        END IF;

        IF p_error_code IS NULL
        THEN
            p_error_code := '0';
            p_error_message :=
                fn_get_error_message (p_error_code, p_language);
        END IF;

        COMMIT;
    EXCEPTION
        WHEN OTHERS
        THEN
            l_log := l_log || 'SQLERRM=' || SQLERRM || ',';
            l_log :=
                   l_log
                || 'TRACE='
                || DBMS_UTILITY.format_error_backtrace
                || ',';
            prc_log (l_log);
            prc_empty_cursor (p_refcursor,
                              p_error_code,
                              p_error_message,
                              p_language);
    END;
END;
/
