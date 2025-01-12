CREATE TABLE questions
    (id NUMBER,
    userid VARCHAR2(200 BYTE),
    typeid VARCHAR2(200 BYTE),
    subjectid VARCHAR2(200 BYTE),
    educationlevelid VARCHAR2(200 BYTE),
    difficultleveltid VARCHAR2(200 BYTE),
    languageid VARCHAR2(200 BYTE),
    pointid VARCHAR2(200 BYTE),
    penaltypointid VARCHAR2(200 BYTE),
    questioninfoid VARCHAR2(200 BYTE))
  SEGMENT CREATION IMMEDIATE
  PCTFREE     10
  PCTUSED     40
  INITRANS    1
  MAXTRANS    255
  TABLESPACE  system
  STORAGE   (
    INITIAL     65536
    NEXT        1048576
    MINEXTENTS  1
    MAXEXTENTS  2147483645
  )
  NOCACHE
  MONITORING
  NOPARALLEL
  LOGGING
/




