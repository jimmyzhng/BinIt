from torchvision import models
from PIL import Image
import torch
import cv2

def trash_detect(img):

    listoftrash = ["broccoli", "wooden spoon", "band aid", 
                "plastic bag", "toilet tissue, toilet paper, bathroom tissue", 
                "paper towel", "diaper, nappy, napkin", "beer bottle", "cup"]

    bin_sort = {
        "broccoli" : "green", 
        "wooden spoon" : "green", 
        "band aid" : "black", 
        "plastic bag" : "black",
        "toilet tissue, toilet paper, bathroom tissue" : "yellow", 
        "paper towel" : "yellow",
        "diaper, nappy, napkin" : "black",
        "beer bottle" : "blue",
        "cup" : "green"
    }

    ResNetWeights=models.ResNet152_Weights.IMAGENET1K_V2
    model = models.resnet152(weights=ResNetWeights)

    with open('backend/imagenet_classes.txt') as f:
        classes = [line.strip() for line in f.readlines()]

    img = cv2.imread(img)
    img = cv2.resize(img, (256,256))
    pill_img = Image.fromarray(img)

    transform = ResNetWeights.transforms()
    img_t = transform(pill_img)

    batch_t = torch.unsqueeze(img_t, 0)
    model.eval()
    out = model(batch_t)

    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    top10 = [(classes[idx].lower(), percentage[idx].item()) for idx in indices[0][:10]]

    for obj in top10:
        if obj[0] in listoftrash:
            return( bin_sort[ obj[0] ] )
    return("Not Found!")