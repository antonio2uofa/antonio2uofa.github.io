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
            src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"
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
            src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
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
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
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
            src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
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
            src="https://pytorch.org/assets/images/pytorch-logo.png"
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
            src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"
          />
        </div>
      }
    >
      TensorFlow
    </Chip>
  );
}
