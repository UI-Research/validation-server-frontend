const sqlCommandOne = `SELECT s006, mars, eic, 
CASE WHEN e00100 < 10000 THEN 0
     WHEN e00100 < 11000 THEN 10
     WHEN e00100 < 12000 THEN 11
     WHEN e00100 < 13000 THEN 12
     WHEN e00100 < 14000 THEN 13
     WHEN e00100 < 15000 THEN 14
     WHEN e00100 < 16000 THEN 15
     WHEN e00100 < 17000 THEN 16
     WHEN e00100 < 18000 THEN 17
     WHEN e00100 < 19000 THEN 18
     WHEN e00100 < 20000 THEN 19
     WHEN e00100 < 21000 THEN 20
     WHEN e00100 < 22000 THEN 21
     WHEN e00100 < 23000 THEN 22
     WHEN e00100 < 24000 THEN 23
     WHEN e00100 < 25000 THEN 24
     WHEN e00100 < 26000 THEN 25
     WHEN e00100 < 27000 THEN 26
     WHEN e00100 < 28000 THEN 27
     WHEN e00100 < 29000 THEN 28
     WHEN e00100 < 30000 THEN 29
     ELSE 0 
END AS income_category
INTO TEMP TABLE temp_table_gmacdonald
FROM puf
;`;

const sqlCommandTwo = `SELECT COUNT(s006), mars, eic, income_category
FROM temp_table_gmacdonald
WHERE mars != 0 AND mars != 1 AND mars != 3 AND eic != 0 AND e00100 <= 30000 AND e00100 >= 10000 AND e59720 > 0
GROUP BY income_category, mars, eic
;`;

const sanitizedCommandInput = {
  epsilon: 1,
  analysis_query:
    'SELECT mars, COUNT(recid) as n FROM puf.puf_kueyama GROUP BY mars',
  transformation_query: 'CREATE TABLE puf.puf_kueyama AS SELECT * FROM puf.puf',
};

export { sanitizedCommandInput, sqlCommandOne, sqlCommandTwo };
