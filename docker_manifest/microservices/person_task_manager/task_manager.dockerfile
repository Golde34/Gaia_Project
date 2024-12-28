FROM node:18

WORKDIR /backend/person_task_manager/task_manager/

COPY ../../../person_task_manager/server/package*.json ./
RUN npm install

# Copy the rest of the application code
COPY ../../../person_task_manager/server/src /backend/person_task_manager/task_manager/src
# COPY ../../../person_task_manager/server/tsconfig.json /backend/person_task_manager/task_manager/tsconfig.json
COPY /.env /backend/person_task_manager/task_manager/src/.env

# Expose the port your service listens on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]