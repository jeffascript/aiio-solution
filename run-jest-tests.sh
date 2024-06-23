#!/bin/bash

# Navigate to the project directory
cd ./client

# Check if the project directory exists
if [ $? -ne 0 ]; then
    echo "Error: Project directory does not exist."
    exit 1
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "Error: package.json not found in the project directory."
    exit 1
fi

# Install dependencies (optional, remove if not needed)
echo "Installing dependencies..."
yarn

# Run Jest tests
echo "Running Jest tests..."
yarn run test

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "Tests passed successfully."
else
    echo "Some tests failed."
    exit 1
fi

# Run Jest tests coverage
echo "Running Jest tests coverage..."
yarn run test:coverage

# Check if tests coverage is shown
if [ $? -eq 0 ]; then
    echo "Tests passed successfully."
else
    echo "Some tests failed."
    exit 1
fi
