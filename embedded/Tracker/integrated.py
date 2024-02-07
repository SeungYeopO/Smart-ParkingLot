import pymysql
import os
import cv2
import base64
import time
import numpy as np

cap = cv2.VideoCapture(0, cv2.CAP_V4L)

cap.set(3, 720)
cap.set(4, 480)

template = cv2.imread('car.PNG')
template_gray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

ret, template_bin = cv2.threshold(template_gray, 127, 255, cv2.THRESH_OTSU)

contours, hierarchy = cv2.findContours(template_bin, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    template_con = template[y:y+h, x:x+w]

h, w = template_con.shape[:2]

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
sqlcctv = """ INSERT INTO cctv (cctv_json) VALUES (%s) """
sqlRF = """SELECT signal_index FROM RF_data"""

def send_data(image):
    try:
        encoded_image = base64.b64encode(image).decode('utf-8')
        cur.execute(sqlcctv, (encoded_image,))
        conn.commit()
        print("Data Insert Success")
    except Exception as e:
        print("Error inserting data:", e)

def receive():
    try:
        cur.execute(sqlRF)
        row = cur.fetchone()
        if row:
            signal_index = row[0]
            return signal_index
        else:
            return None
    except Exception as e:
        print("Error selecting data:", e)
        return None

def tracker(ret, frame, RF):
    src_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    src_canny = cv2.Canny(src_gray, 50, 100)
    ret, src_bin = cv2.threshold(src_gray, 127, 255, cv2.THRESH_OTSU)

    img_frame = np.array(frame)

    result = cv2.matchTemplate(img_frame, template_con, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    top_left = max_loc
    bottom_right = (top_left[0] + w, top_left[1] + h)

    center_x = (bottom_right[0] + top_left[0]) // 2
    center_y = (bottom_right[1] + top_left[1]) // 2

    cv2.circle(img_frame, (center_x, center_y), 5, (0, 0, 255), -1)
    cv2.rectangle(img_frame, top_left, bottom_right, (0, 255, 0), 2)
    print(center_x, center_y)

    cv2.imshow('res', img_frame)


while True:
    num = receive()
    ret, img = cap.read()
    tracker(ret, img, num)    
    img = cv2.flip(img, -1)
    ret, imageEncoded = cv2.imencode('.jpg', img)
    imageBlob = imageEncoded.tobytes()
    send_data(imageBlob)
    k = cv2.waitKey(1)
    if k == 27:
        break

cur.close()
conn.close()
cap.release()
cv2.destroyAllWindows()