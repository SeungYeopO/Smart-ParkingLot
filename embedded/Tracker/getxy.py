import cv2
import numpy as np

src = cv2.VideoCapture(0)
src.set(cv2.CAP_PROP_FRAME_WIDTH, 80)
src.set(cv2.CAP_PROP_FRAME_HEIGHT, 60)

def on_mouse(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print("x: %d, y: %d" %(x,y))

while 1:
    _, frame = src.read()
    cv2.imshow('test', frame)
    cv2.setMouseCallback('test', on_mouse, frame)
    k = cv2.waitKey(1)
    if k == 27:
        break

src.release()
cv2.destroyAllWindows()