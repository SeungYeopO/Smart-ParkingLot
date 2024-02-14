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
sqlposition = """ UPDATE car_positions SET point_num = (%s) WHERE entry_car_id = 1"""

def send_data(image):
    try:
        encoded_image = base64.b64encode(image).decode('utf-8')
        cur.execute(sqlcctv, (encoded_image,))
        conn.commit()
        print("Insert Success")
    except Exception as e:
        print("Error Insert:", e)

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
        print("Error Select:", e)
        return None

def update_data(num):
    try:
        cur.execute(sqlposition, (num),)
        conn.commit()
        print(num + " Update Success")
    except Exception as e:
        print("Error Update:", e)

def changeposition(x, y, RF):
    if RF == '1':
        if x >= 526 and x <= 579 and y >= 70 and y <= 176:
            update_data('115')
        elif x >= 476 and x <= 526 and y >= 70 and y <= 176:
            update_data('116')
        elif x >= 440 and x <= 476 and y >= 70 and y <= 176:
            update_data('117')
    elif RF == '2':
        if x >= 392 and x <= 440 and y >= 70 and y <= 183:
            update_data('119')
        elif x >= 328 and x <= 392 and y >= 70 and y <= 183:
            update_data('120')
        elif x >= 281 and x <= 328 and y >= 70 and y <= 183:
            update_data('121')
        elif x >= 244 and x <= 281 and y >= 70 and y <= 186:
            update_data('122')
        elif x >= 111 and x <= 186 and y >= 0 and y <= 76:
            update_data('148')
    elif RF == '3':
        if x >= 111 and x <= 186 and y >= 0 and y <= 76:
            update_data('148')
        elif x >= 111 and x <= 186 and y >= 76 and y <= 179:
            update_data('147')
        elif x >= 111 and x <= 192 and y >= 179 and y <= 220:
            update_data('145')
        elif x >= 111 and x <= 191 and y >= 220 and y <= 270:
            update_data('144')
        elif x >= 111 and x <= 190 and y >= 270 and y <= 325:
            update_data('143')
    elif RF == '4':
        if x >= 113 and x <= 190 and y >= 325 and y <= 375:
            update_data('141')
        elif x >= 113 and x <= 190 and y >= 375 and y <= 315:
            update_data('140')
        elif x >= 113 and x <= 190 and y >= 415 and y <= 480:
            update_data('139')
        elif x >= 190 and x <= 236 and y >= 333 and y <= 480:
            update_data('67')
        elif x >= 235 and x <= 285 and y >= 333 and y <= 480:
            update_data('114')   
    elif RF == '5':
        if x >= 285 and x <= 335 and y >= 333 and y <= 480:
            update_data('113')
        elif x >= 335 and x <= 380 and y >= 333 and y <= 480:
            update_data('112')
        elif x >= 380 and x <= 445 and y >= 333 and y <= 480:
            update_data('111')
    elif RF == '6':
        if x >= 445 and x <= 500 and y >= 333 and y <= 480:
            update_data('110')
        elif x >= 500 and x <= 534 and y >= 333 and y <= 480:
            update_data('109')
        elif x >= 534 and x <= 640 and y >= 333 and y <= 480:
            update_data('108')
    else:
        print("Error in RF data")

def tracking(ret, frame, RF):
    img_frame = np.array(frame)
    result = cv2.matchTemplate(img_frame, template_con, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    top_left = max_loc
    bottom_right = (top_left[0] + w, top_left[1] + h)

    center_x = (bottom_right[0] + top_left[0]) // 2
    center_y = (bottom_right[1] + top_left[1]) // 2

    cv2.circle(img_frame, (center_x, center_y), 5, (0, 0, 255), -1)
    cv2.rectangle(img_frame, top_left, bottom_right, (0, 255, 0), 2)
    print("x:",center_x, "y:", center_y)
    changeposition(center_x, center_y, RF)
    cv2.imshow('res', img_frame)

while True:
    num = receive()
    ret, img = cap.read()
    tracking(ret, img, num)    
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