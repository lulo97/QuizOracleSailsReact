﻿CREATE TABLE LANGUAGES
(
  ID           NUMBER,
  NAME         VARCHAR2(200 BYTE),
  DESCRIPTION  VARCHAR2(4000 BYTE)
)
LOGGING 
NOCOMPRESS 
NOCACHE
RESULT_CACHE (MODE DEFAULT)
NOPARALLEL
MONITORING;
