FROM python:3.10-slim

# Set working directory
WORKDIR /app

# System dependencies are not required since we use Pillow instead of OpenCV

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port (Cloud Run expects 8080 by default)
ENV PORT 8080

# Command to run the application
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
