import React from "react";
import { Chip } from "@heroui/chip"; // Replace with your actual Chip component library

// Python Chip
export function PythonChip() {
  return (
    <Chip
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
            alt="Python Logo"
            className="object-contain w-full h-full"
          />
        </div>
      }
      variant="flat"
    >
      Python
    </Chip>
  );
}

// TensorFlow Chip
export function TensorFlowChip() {
  return (
    <Chip
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"
            alt="TensorFlow Logo"
            className="object-contain w-full h-full"
          />
        </div>
      }
      variant="flat"
    >
      TensorFlow
    </Chip>
  );
}

export const DockerChip = () => {
  return (
    <Chip
      avatar={
        <div className="flex items-center justify-center w-full h-full">
          <img
            src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"
            alt="Docker"
            className="w-full h-full object-contain"
          />
        </div>
      }
      variant="flat"
    >
      Docker
    </Chip>
  );
};

export const PyTorchChip = () => {
  return (
    <Chip
      avatar={
        <div className="flex items-center justify-center w-full h-full">
          <img
            src="https://pytorch.org/assets/images/pytorch-logo.png"
            alt="PyTorch"
            className="w-full h-full object-contain"
          />
        </div>
      }
      variant="flat"
    >
      PyTorch
    </Chip>
  );
};

export const JavaChip = () => {
  return (
    <Chip
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
            alt="Java Logo"
            className="object-contain w-full h-full"
          />
        </div>
      }
      variant="flat"
    >
      Java
    </Chip>
  );
};

// Firebase Chip
export const FirebaseChip = () => {
  return (
    <Chip
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-vertical.png"
            alt="Firebase Logo"
            className="object-contain w-full h-full"
          />
        </div>
      }
      variant="flat"
    >
      Firebase
    </Chip>
  );
};

export const NextJSChip = () => {
  return (
    <Chip
      avatar={
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
            alt="Next.js Logo"
            className="object-contain w-full h-full"
          />
        </div>
      }
      variant="flat"
    >
      Next.js
    </Chip>
  );
};
