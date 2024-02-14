import pymysql

db = pymysql.connect(host='i10c102.p.ssafy.io', user='snowman', password='snowman',  db='parking_info')

cursor = db.cursor()

cursor.execute("SELECT * from parking_lots")
row = cursor.fetchone()

print(row)
#db.commit()

cursor.close()
db.close()