import pymysql
import os
import cv2
import base64
import time

cap = cv2.VideoCapture(0, cv2.CAP_V4L)

try:
    conn = pymysql.connect(
        host='3.38.208.90',
        user='snowman',
        password='snowman',
        db='parking_info',
        charset='utf8mb4'
    )

except pymysql.Error as e:
    print("Database Access Error:", e)
    exit(1)

cur = conn.cursor()
print("DataBase Connection Success")
sql = """ INSERT INTO cctv (cctv_json) VALUES (%s) """  # Assuming cctv_blob is the column to store imageBlob

def send_data(image):
    try:
        # Encode the binary data (imageBlob) as base64
        encoded_image = base64.b64encode(image).decode('utf-8')

        # Execute the SQL INSERT statement with the base64 encoded image
        cur.execute(sql, (encoded_image,))
        conn.commit()
        print("Data Insert Success")
    except Exception as e:
        print("Error inserting data:", e)

while True:
    _, img = cap.read()
    img = cv2.flip(img, -1)
    _, imageEncoded = cv2.imencode('.jpg', img)
    imageBlob = imageEncoded.tobytes()

    send_data(imageBlob)

cur.close()
conn.close()
