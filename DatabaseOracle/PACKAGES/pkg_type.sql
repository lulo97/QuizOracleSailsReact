CREATE OR REPLACE 
PACKAGE pkg_type
IS
    TYPE obj IS TABLE OF VARCHAR2(200) INDEX BY VARCHAR2(4000);
END;
/


CREATE OR REPLACE 
PACKAGE BODY pkg_type
IS
END;
/
