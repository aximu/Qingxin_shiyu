#!/bin/bash

# Activate the virtual environment
echo "Activating virtual environment..."
source env/bin/activate

# Install dependencies using pip
echo "Installing Python dependencies..."
poetry install

# Run Langchain
echo "Running Langchain server..."
poetry run langchain serve
