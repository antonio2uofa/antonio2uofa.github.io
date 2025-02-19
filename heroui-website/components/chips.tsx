import React from "react";
import { Chip } from "@heroui/chip"; // Replace with your actual Chip component library

export const DockerChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="flex items-center justify-center w-full h-full">
          <img
            alt="Docker"
            className="w-full h-full object-contain"
            src="/icons/docker.png"
          />
        </div>
      }
    >
      Docker
    </Chip>
  );
};

export const FirebaseChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="Firebase Logo"
            className="object-contain w-full h-full"
            src="/icons/firebase.svg"
          />
        </div>
      }
    >
      Firebase
    </Chip>
  );
};

export const JavaChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="Java Logo"
            className="object-contain w-full h-full"
            src="/icons/java.svg"
          />
        </div>
      }
    >
      Java
    </Chip>
  );
};

export const NextJSChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="Next.js Logo"
            className="object-contain w-full h-full"
            src="/icons/nextjs.svg"
          />
        </div>
      }
    >
      Next.js
    </Chip>
  );
};

// Python Chip
export function PythonChip() {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="Python Logo"
            className="object-contain w-full h-full"
            src="/icons/python.svg"
          />
        </div>
      }
    >
      Python
    </Chip>
  );
}

export const PyTorchChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="flex items-center justify-center w-full h-full">
          <img
            alt="PyTorch"
            className="w-full h-full object-contain"
            src="/icons/pytorch.svg"
          />
        </div>
      }
    >
      PyTorch
    </Chip>
  );
};

// TensorFlow Chip
export function TensorFlowChip() {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="TensorFlow Logo"
            className="object-contain w-full h-full"
            src="/icons/tensorflow.svg"
          />
        </div>
      }
    >
      TensorFlow
    </Chip>
  );
}

// C++ Chip
export const CppChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="C++ Logo"
            className="object-contain w-full h-full"
            src="/icons/cpp.svg"
          />
        </div>
      }
    >
      C++
    </Chip>
  );
};

// YOLOv11/Ultralytics Chip
export const YOLOChip = () => {
  return (
    <Chip
      variant="flat"
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            alt="YOLOv11/Ultralytics Logo"
            className="object-contain w-full h-full"
            src="/icons/yolo.svg"
          />
        </div>
      }
    >
      YOLOv11/Ultralytics
    </Chip>
  );
};
