import numpy as np
import cv2


def combine_imgs(imgs):
    loaded_imgs = [cv2.imread(img) for img in imgs]
    combined_image = np.hstack(loaded_imgs)
    
    cv2.imwrite("public/photos/combined.jpg", combined_image)

if __name__=="__main__":
    imgs = ["public/photos/list.png", "public/photos/login.png", "public/photos/guitar.png", "public/photos/add_item.png"]
    combine_imgs(imgs)