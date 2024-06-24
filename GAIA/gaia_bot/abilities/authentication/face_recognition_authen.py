import pickle
import time
import cv2
import imutils
import numpy as np
from imutils.video import VideoStream, FPS

from gaia_bot.process.console_manager import ConsoleManager


def master_recognize(protoPath, modelPath, embeddedPath, recognizePath, lePath):
    console = ConsoleManager()
    recognizer = pickle.loads(open(recognizePath, "rb").read())
    le = pickle.loads(open(lePath, "rb").read())
    detector = cv2.dnn.readNetFromCaffe(protoPath, modelPath)
    embedder = cv2.dnn.readNetFromTorch(embeddedPath)

    total_image = 0
    boss_face = 0
    detect_boss_face = False
    rectangle_color = (0, 0, 255)
    is_not_boss = True
    count_wrong = 0

    console.console_output(text="Initiate face recoginition video stream",info_log="Starting video stream...")
    vs = VideoStream(src=0).start()
    time.sleep(2.0)

    fps = FPS().start()

    while is_not_boss and count_wrong < 10:
        frame = vs.read()

        frame = imutils.resize(frame, width=600)
        (h, w) = frame.shape[:2]

        imageBlob = cv2.dnn.blobFromImage(
            cv2.resize(frame, (300, 300)), 1.0, (300, 300),
            (104.0, 177.0, 123.0), swapRB=False, crop=False)

        detector.setInput(imageBlob)
        detections = detector.forward()

        for i in range(0, detections.shape[2]):
            confidence = detections[0, 0, i, 2]

            if confidence > 0.5:
                if detect_boss_face:
                    total_image += 1
                if total_image == 50:
                    if boss_face > 40:
                        rectangle_color = (0, 255, 0)
                        is_not_boss = False
                    else:
                        boss_face = 0
                        total_image = 0
                        detect_boss_face = False
                        count_wrong += 1
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")

                face = frame[startY:endY, startX:endX]
                (fH, fW) = face.shape[:2]

                if fW < 20 or fH < 20:
                    continue

                faceBlob = cv2.dnn.blobFromImage(face, 1.0 / 255,
                                                 (96, 96), (0, 0, 0), swapRB=True, crop=False)
                embedder.setInput(faceBlob)
                vec = embedder.forward()

                preds = recognizer.predict_proba(vec)[0]
                j = np.argmax(preds)
                proba = preds[j]
                name = le.classes_[j]
                if name == "data/my_face":
                    name = "Golde"
                    boss_face += 1
                    detect_boss_face = True
                else:
                    name = "Unknown"
                text = "{}: {:.2f}%".format(name, proba * 100)
                y = startY - 10 if startY - 10 > 10 else startY + 10
                cv2.rectangle(frame, (startX, startY), (endX, endY),
                              rectangle_color, 2)
                cv2.putText(frame, text, (startX, y),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)

        fps.update()

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord("q"):
            break

    time.sleep(0.5)
    fps.stop()
    
    cv2.destroyAllWindows()
    vs.stop()

    if count_wrong < 10:
        return True
    else:
        return False